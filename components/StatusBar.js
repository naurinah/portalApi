import EqualizerIcon from "@material-ui/icons/Equalizer";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CurrencyFormat from "react-currency-format";

const StatusBar = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-6 p-[2rem]">
        {/* Shipment */}
        <div className="bg-white min-h-[7rem] w-[18rem] flex flex-1 items-center rounded-md shadow-md border-b-4 border-[#1bc943]  p-2">
          <div className="bg-[#1bc943] h-12 w-12 rounded-full flex items-center justify-center mx-4 ">
            <EqualizerIcon className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">SHIPMENTS TODAY</p>
            <h2 className="text-[#1bc943] font-bold text-4xl">
              <CurrencyFormat
                value={604}
                displayType={"text"}
                thousandSeparator={true}
              />
            </h2>
          </div>
        </div>
        {/* Shipment */}
        <div className="bg-white min-h-[7rem] w-[18rem] flex flex-1 items-center rounded-md shadow-md border-b-4 border-[#4191ff]  p-2">
          <div className="bg-[#4191ff] h-12 w-12 rounded-full flex items-center justify-center mx-4 ">
            <PermIdentityIcon className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">NEW CUSTOMERS</p>
            <h2 className="text-[#4191ff] font-bold text-4xl">
              <CurrencyFormat
                value={11}
                displayType={"text"}
                thousandSeparator={true}
              />
            </h2>
          </div>
        </div>
        {/* Shipment */}
        <div className="bg-white min-h-[7rem] w-[18rem] flex flex-1 items-center rounded-md shadow-md border-b-4 border-[#f83245]  p-2">
          <div className="bg-[#f83245] h-12 w-12 rounded-full flex items-center justify-center mx-4 ">
            <ReportProblemIcon className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">DANGER APIS</p>
            <h2 className="text-[#f83245] font-semibold text-sm">
              Status (
              <CurrencyFormat
                value={253065}
                displayType={"text"}
                thousandSeparator={true}
              />
              ) Hits
            </h2>
            <h2 className="text-[#f83245] font-semibold text-sm">
              Booking (
              <CurrencyFormat
                value={253065}
                displayType={"text"}
                thousandSeparator={true}
              />
              ) Hits
            </h2>
            <h2 className="text-[#f83245] font-semibold text-sm">
              Booking (
              <CurrencyFormat
                value={253065}
                displayType={"text"}
                thousandSeparator={true}
              />
              ) Hits
            </h2>
          </div>
        </div>
        {/* Shipment */}
        <div className="bg-white min-h-[7rem] w-[18rem] flex flex-1 items-center rounded-md shadow-md border-b-4 border-[#f4772e] p-2">
          <div className="bg-[#f4772e] h-12 w-12 rounded-full flex items-center justify-center mx-4 ">
            <AttachMoneyIcon className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">SALES</p>
            <h2 className="text-[#f4772e] font-bold text-4xl">
              <CurrencyFormat
                value={1286}
                displayType={"text"}
                thousandSeparator={true}
              />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
