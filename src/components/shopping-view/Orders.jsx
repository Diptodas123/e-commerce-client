import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import ShoppingOrderDetails from "./OrderDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { renderDate, renderPrice } from "@/utils/convertToLocale";
import { Package, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
  const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const { orderList } = useSelector(state => state.shopOrder);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetails({
      id: orderId,
      userId: user.id
    })).then((data) => {
      if (data?.payload?.status === 'success') {
        setOpenOrderDetailsDialog(true);
      }
    });
  }

  useEffect(() => {
    dispatch(getAllOrdersByUser(user.id)).finally(() => {
      setIsLoadingOrders(false);
    });
  }, [dispatch, user.id]);

  if (isLoadingOrders) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading your orders...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {orderList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Button onClick={() => window.location.href = '/shop/home'}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Id</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Order Price</TableHead>
                  <TableHead>
                    <span className="sr-only">Details</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList.map(order => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{renderDate(order.createdAt)}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${order.orderStatus === "confirmed" ? "bg-green-500" : order.orderStatus === "cancelled" ? "bg-red-500" : "bg-black"}`}
                      >
                        {order.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{renderPrice(order.totalAmount)}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleFetchOrderDetails(order._id)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Dialog
              open={openOrderDetailsDialog}
              onOpenChange={(open) => {
                setOpenOrderDetailsDialog(open);
                if (!open) {
                  dispatch(resetOrderDetails());
                }
              }}
            >
              <ShoppingOrderDetails />
            </Dialog>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders;
