import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash2Icon } from "lucide-react";

const AddressCard = ({
  addressInfo,
  handleOnEditAddress,
  handleOnDeleteAddress,
  setCurrentSelectedAddress
}) => {
  return (
    <Card
      className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={() => setCurrentSelectedAddress ? setCurrentSelectedAddress(addressInfo) : null}
    >
      <CardContent className={"grid gap-4 p-4"}>
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Postal Code: {addressInfo?.postalCode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        {
          addressInfo?.notes && <Label>Notes: {addressInfo?.notes}</Label>
        }
      </CardContent>
      <CardFooter className={"flex justify-end gap-2"}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleOnEditAddress(addressInfo)}
        >
          <EditIcon />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => handleOnDeleteAddress(addressInfo?._id)}
        >
          <Trash2Icon />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCard;
