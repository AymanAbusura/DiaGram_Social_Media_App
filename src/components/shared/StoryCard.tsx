import React from "react";
import { useUserContext } from "@/context/AuthContext";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function StoryCard({ itemId }: { itemId: string }) {
  const { user } = useUserContext();
  const visibility = React.useContext(VisibilityContext);

  const visible = visibility.isItemVisible(itemId);

  return (
    <div role="button" tabIndex={0} className="card"
      style={{
        width: "80px",
        height: "80px",
        border: "1px solid",
        borderRadius: 80/2,
        borderWidth: 2,
        borderColor: '#7970ff',
        display: "inline-block",
        margin: "0 10px",
        userSelect: "none"
      }}>
        <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} style={{
        width: "70px",
        height: "70px",
        border: "1px solid",
        borderRadius: 70/2,
        borderWidth: 2,
        borderColor: '#7970ff',
        display: "inline-block",
        margin: "3px",
        userSelect: "none"
      }}/>
        {/* <div className="text-center m-5">{user.imageUrl}</div> */}
    </div>
  );
}
