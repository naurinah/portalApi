import { Card, CardContent } from "@material-ui/core";
import ProgressBar from "react-bootstrap/ProgressBar";
import CurrencyFormat from "react-currency-format";

const Bookings = () => {
  return (
    <Card className="m-[2rem] mt-0 p-[1rem] border-b-4 border-[#1bc943]">
      <CardContent className="border-b ">
        <h2 className="font-bold text-lg">
          BOOKINGS{" "}
          <span className="font-normal text-sm">
            (Last 7 days) (
            <CurrencyFormat
              value={257012}
              displayType={"text"}
              thousandSeparator={true}
            />
            )
          </span>
        </h2>
      </CardContent>
      <CardContent className="border-b flex items-center gap-6">
        <ProgressBar
          variant="success"
          now={90}
          label={"90%"}
          className="flex-1"
        />
        <div className="flex flex-col items-center justify-center  w-[6rem]">
          <p className="text-sm text-gray-600 mb-1">OPEN APIS</p>
          <h2 className="text-[#1bc943] font-semibold text-xl">
            <CurrencyFormat
              value={253065}
              displayType={"text"}
              thousandSeparator={true}
            />
          </h2>
        </div>
      </CardContent>
      <CardContent className="border-b flex items-center gap-6">
        <ProgressBar variant="info" now={10} label={"10%"} className="flex-1" />
        <div className="flex flex-col items-center justify-center  w-[6rem]">
          <p className="text-sm text-gray-600 mb-1">WORDPRESS</p>
          <h2 className="text-[#4191ff] font-semibold text-xl">
            <CurrencyFormat
              value={190}
              displayType={"text"}
              thousandSeparator={true}
            />
          </h2>
        </div>
      </CardContent>
      <CardContent className="flex items-center gap-6">
        <ProgressBar
          variant="danger"
          now={30}
          label={"30%"}
          className="flex-1"
        />
        <div className="flex flex-col items-center justify-center w-[6rem]">
          <p className="text-sm text-gray-600 mb-1">SHOPIFY</p>
          <h2 className="text-[#f83245] font-semibold text-xl">
            <CurrencyFormat
              value={1875}
              displayType={"text"}
              thousandSeparator={true}
            />
          </h2>
        </div>
      </CardContent>
    </Card>
  );
};

export default Bookings;
