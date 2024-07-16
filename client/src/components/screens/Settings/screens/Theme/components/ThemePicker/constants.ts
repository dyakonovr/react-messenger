import type { Themes } from "@/src/types/general/theme";

type ColorsObject = {
  startColor: string;
  endColor: string;
};
type ObjectType = Record<Themes, ColorsObject>;

export const colorsByTheme: ObjectType = {
  "white-blue": {
    startColor: "#fff",
    endColor: "#5B96F7"
  },
  "white-red": {
    startColor: "#fff",
    endColor: "#ef4444"
  },
  "white-green": {
    startColor: "#fff",
    endColor: "#10b981"
  },
  "white-purple": {
    startColor: "#fff",
    endColor: "#8b5cf6"
  },
  "white-pink": {
    startColor: "#fff",
    endColor: "#d946ef"
  }
};
