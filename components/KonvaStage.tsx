import dynamic from "next/dynamic";
import { IStageProps } from "react-konva";

const Stage = dynamic(() => import("react-konva").then((mod) => mod.Stage), {
  ssr: false,
});

export default function KonvaStage(props: IStageProps) {
  return <Stage {...props} />;
}
