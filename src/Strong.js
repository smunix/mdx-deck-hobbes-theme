import React from "react";

export const strong = color => props => (
  <strong style={{ color: color }}>{props.children}</strong>
);
