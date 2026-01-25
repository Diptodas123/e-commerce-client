import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditIcon, Trash2Icon, CheckCircle2 } from "lucide-react";

const AddressCard = ({
  addressInfo,
  handleOnEditAddress,
  handleOnDeleteAddress,
  isSelected,
  handleChangeSelectedAddress
}) => {

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer relative ${
        isSelected ? 'ring-2 ring-primary border-primary shadow-md' : ''
      }`}
      onClick={() => handleChangeSelectedAddress(addressInfo)}
    >
      {isSelected && (
        <Badge className="absolute top-2 right-2 bg-primary flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Selected
        </Badge>
      )}
      <CardContent className={"grid gap-4 p-4 pt-6"}>
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
