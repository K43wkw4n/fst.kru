import { observer } from "mobx-react-lite";
import ReactECharts from "echarts-for-react";

const ChartPie = ({
  data,
  height = "400px",
  name,
  top,
  title,
  open = false,
}: any) => {
  return (
    <ReactECharts
      style={
        data?.length > 6
          ? open
            ? { height: "470px", width: 400, alignItems: "center" }
            : { height: "470px", width: "100%", alignItems: "center" }
          : open
          ? { height: "450px", width: 400, alignItems: "center" }
          : { height: "450px", width: "100%", alignItems: "center" }
      }
      option={{
        title: {
          text: title,
          // subtext: "Fake Data",
          left: "center",
        },
        legend: {
          bottom: "bottom",
        },
        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b}: {c}",
        },
        toolbox: {
          feature: {
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: name,
            type: "pie",
            radius: ["20%", "60%"],
            height: height,
            top: top,
            avoidLabelOverlap: false,
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              // labelLine: {
              //   show: false,
              // },
            },
            label: {
              show: true,
              formatter: "{d}%",
            },
          },
        ],
      }}
    />
  );
};

export default observer(ChartPie);
