import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../store/store";
import { Card, Col, Empty, Input, Row, Select, Skeleton, Space } from "antd";
import { RAP } from "../../../models/RAP";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../../constants/RoutePath";
import CardResearch from "../../../components/CardResearch";
import { DataEmpty } from "../../../components/DataEmpty";

const RAPPage = ({ branchId }: { branchId: number | null }) => {
  const {
    ResearchAndProjectStore: {
      loading,
      getResearchAndProjectById,
      RAPUser,
      categoryNameDropdown,
      getCategoryNameDDByBranchByGroup,
      searchResearchAndProject,
    },
  } = useStore();

  const allValues = {
    value: 0,
    label: "ทั้งหมด",
  };

  const [value, setValue] = useState<any>(allValues);

  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    // getResearchAndProjectById(branchId).then((res) => {
    //   setData(res);
    // });
    onSearch();

    getCategoryNameDDByBranchByGroup(branchId);
  }, []);

  useEffect(() => {
    setData(RAPUser);
  }, [search === ""]);

  // console.log(
  //   "values",
  //   branchId,
  //   value.value === 0 ? null : value.value,
  //   search === "" ? null : search
  // );

  const onSearch = () => {
    searchResearchAndProject(
      branchId,
      value.value === 0 ? "" : `&category=${value.value}`,
      search === "" ? "" : `&search=${search}`
    ).then((res) => {
      setData(res);
    });
    // setLoading(true);
    // setData(
    //   data.filter((x: RAP) => {
    //     return x.name.includes(search);
    //   })
    // );
    // setLoading(false);
  };

  const items = categoryNameDropdown.map((item) => {
    return {
      value: item.key,
      label: item.key,
    };
  });

  return (
    <>
      <Space.Compact
        block
        style={{
          margin: "40px 0",
        }}
      >
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{
            width: "100%",
          }}
        >
          <Col xs={24} sm={16} md={12} lg={8} xl={7} xxl={7}>
            <Select
              defaultValue={[allValues]}
              placeholder="ทั้งหมด"
              options={[allValues, ...items]}
              style={{ width: "100%", marginBottom: 20 }}
              // allowClear
              value={value}
              onChange={(e) => {
                const find = categoryNameDropdown.find((x) => x.key === e);

                if (find === undefined) {
                  setValue(allValues);
                } else {
                  setValue({
                    value: find?.key,
                    label: find?.key,
                  });
                }
              }}
              onSelect={(e) => {
                console.log("e", e);
                searchResearchAndProject(
                  branchId,
                  e === 0 ? "" : `&category=${e}`,
                  search === "" ? "" : `&search=${search}`
                ).then((res) => {
                  console.log("res", res);
                  setData(res);
                });
              }}
            />
          </Col>
          <Col xs={24} sm={16} md={12} lg={8} xl={7} xxl={7}>
            <Input.Search
              placeholder="ค้นหาชื่องานวิจัย หรือ คำสำคัญ"
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%" }}
              allowClear
              onSearch={onSearch}
            />
          </Col>
        </Row>
      </Space.Compact>

      {loading ? (
        <div
          style={{
            height: 600,
          }}
        >
          <Skeleton active />
        </div>
      ) : data.length !== 0 ? (
        <Card
          style={{
            minHeight: 600,
          }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
            {data.map((item: RAP, i: number) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={6}
                xxl={6}
                key={i}
                className="gutter-row"
                style={{
                  marginBottom: 25,
                }}
              >
                <NavLink
                  to={RoutePath.viewresearchandproject}
                  state={JSON.stringify(item)}
                >
                  <CardResearch item={item} />
                </NavLink>
              </Col>
            ))}
          </Row>
        </Card>
      ) : (
        <>
          <div
            style={{
              minHeight: 600,
            }}
          >
            <DataEmpty />
          </div>
        </>
      )}
    </>
  );
};

export default observer(RAPPage);
