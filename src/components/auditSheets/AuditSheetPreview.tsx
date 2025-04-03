
import React from "react";
import BusinessAuditSheet from "./BusinessAuditSheet";
import ForecourtShopAuditSheet from "./ForecourtShopAuditSheet";
import ShopAuditSheet from "./ShopAuditSheet";

interface AuditSheetPreviewProps {
  type: string;
  data: any;
}

const AuditSheetPreview: React.FC<AuditSheetPreviewProps> = ({ type, data }) => {
  switch (type) {
    case "business":
      return <BusinessAuditSheet data={data} />;
    case "forecourt_shop":
      return <ForecourtShopAuditSheet data={data} />;
    case "shop_only":
      return <ShopAuditSheet data={data} />;
    default:
      return <div>Invalid audit sheet type</div>;
  }
};

export default AuditSheetPreview;
