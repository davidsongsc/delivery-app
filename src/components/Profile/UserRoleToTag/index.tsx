import { UserRoles, UserRolesTranslated } from "@/enum/UserRoles";
import { Tag } from "antd";
import React from "react";
import { roleColors } from "@/enum/roleColors";

const UserRoleToTag = ({ role }: { role: UserRoles }) => {
  const roleTranslated = UserRolesTranslated[role];
  const bgColor = roleColors[role] || "#ccc";

  return (
    <Tag
      style={{
        
        borderLeft: `5px solid ${bgColor}`,
        width: "100%",
        backgroundColor: "transparent",

      }}
    >
      {roleTranslated}
    </Tag>
  );
};

export default React.memo(UserRoleToTag);
