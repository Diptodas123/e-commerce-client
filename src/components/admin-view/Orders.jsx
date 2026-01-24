import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { renderPrice } from "@/utils/convertToLocale";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AdminOrderDetailsView from "./OrderDetails";

const AdminOrdersView = () => {

  const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className={"font-bold text-lg"}>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
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
            <TableRow>
              <TableCell>#12345</TableCell>
              <TableCell>2024-06-15</TableCell>
              <TableCell>Shipped</TableCell>
              <TableCell>{renderPrice(99.99)}</TableCell>
              <TableCell>
                <Dialog open={openOrderDetailsDialog} onOpenChange={setOpenOrderDetailsDialog}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setOpenOrderDetailsDialog(true)}>View Details</Button>
                  </DialogTrigger>
                  <AdminOrderDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrdersView;
