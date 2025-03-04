import { Card, Col, Empty, Input, Row, Skeleton, Space } from "antd";
import { observer } from "mobx-react-lite";
import CardProject from "../../../components/CardProject";
import { useStore } from "../../../store/store";
import { useEffect, useState } from "react";
import { Project } from "../../../models/Projects";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../../constants/RoutePath";

const ProjectPage = ({ branchId }: { branchId: number | null }) => {
  const { project, getProjectById, loading, searchProject } =
    useStore().userStore;

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    onSearch();
    // getProjectById(branchId).then((res) => {
    //   setData(res);
    // });
  }, []);

  // console.log("project", JSON.stringify(project));

  useEffect(() => {
    // setSearchResult(test.substring(0, search.length));

    setData(project);
  }, [search === ""]);

  // const test = "ขอโทษค้าบบ";

  const onSearch = () => {
    searchProject(
      branchId,
      search === "" ? "" : `&search=${search === "" ? null : search}`
    ).then((res) => {
      setData(res);
    });
    // setData(
    //   data.filter((x: any) => {
    //     const keyWords = JSON.parse(x.keyWords);
    //     console.log(x.keyWords);

    //     const keywordsOnSearch = keyWords.some((item: string) =>
    //       item.toUpperCase().includes(search.toUpperCase())
    //     );
    //     return x.nameTH.includes(search) || keywordsOnSearch;
    //   })
    // );
  };

  return (
    <>
      {/* <h2>โครงงานวิจัยนักศึกษา</h2> */}

      <Space.Compact
        block
        style={{
          margin: "40px 0",
        }}
      >
        <Row
          style={{
            width: "100%",
          }}
        >
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
            {data.map((item: Project, i: number) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} key={i}>
                <NavLink
                  to={RoutePath.viewproject}
                  state={JSON.stringify(item)}
                >
                  <CardProject item={item} />
                </NavLink>
              </Col>
            ))}
          </Row>
        </Card>
      ) : (
        <Empty
          style={{
            minHeight: 600,
          }}
          description="ไม่มีข้อมูล"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </>
  );
};

export default observer(ProjectPage);
