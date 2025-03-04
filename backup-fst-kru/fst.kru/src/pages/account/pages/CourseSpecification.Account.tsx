import { observer } from "mobx-react-lite";
import DataTable from "../../../components/DataTable";
import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Empty,
  Form,
  Image,
  Input,
  InputRef,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tooltip,
  Tour,
  Upload,
} from "antd";
import { useStore } from "../../../store/store";
import { useEffect, useRef, useState } from "react";
import { CourseSpecification } from "../../../models/CourseSpecification";
import {
  formatDateThai,
  notify,
  props,
  rules,
} from "../../../helper/components";
import {
  CloseOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { pathImages } from "../../../constants/RoutePath";
import {
  FaRegFileExcel,
  FaRegFilePdf,
  FaRegFileWord,
  FaRegUser,
} from "react-icons/fa6";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyRemovePop from "../../../components/MyRemovePop";
import MyButton from "../../../components/MyButton";
import MySave from "../../../components/MySave";
import dayjs from "dayjs";
import { TitlePath } from "../../../constants/TitlePath";
import { Branch } from "../../../models/Branch";
import { PersonnelinBranch } from "../../../models/PersonnelinBranch";
import { DataEmpty } from "../../../components/DataEmpty";
import "dayjs/locale/th";
import locale from "antd/lib/locale/th_TH";
import { getColumnSearchProps } from "../../../components/Search";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import type { TourProps } from "antd";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

interface props {
  bool: boolean;
}

const CourseSpecificationAccount = ({ bool }: props) => {
  const componentRef = useRef<HTMLElement | null>(null);
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const {
    createUpdateCourseSpecification,
    uploadFile,
    categoryCourseS,
    getCategoryCourseS,
    createUpdateCategoryCourseS,
    removeCategoryCourseS,
    subjects,
    getSubjects,
    createUpdateSubjects,
    categoryCourseSCount,
    getCountCategoryCourseSpecification,
    removeCourseSpecification,
    courseSpecification,
    AllcourseSpecification,
    getCourseSpecificationByUser,
    getAllCourseSpecifications,
    courseSpecificationinBranch,
    getCourseSpecificationsById,
  } = useStore().courseSpecificationStore;
  const { user } = useStore().userStore;
  const { currentBranchId } = useStore().BranchStore;
  const { tour, setTour } = useStore().commonStore;

  const [formMode, setFormMode] = useState(false);

  const [file, setFile]: any = useState<UploadFile[]>([]);
  const [sectionFile, setSectionFile]: any = useState<UploadFile[]>([]);

  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>([]);

  // console.log("dataEdit", JSON.stringify(dataEdit));

  const [onError, setOnError] = useState(false);

  const [category, setCategory] = useState<any>(null);
  const [onSelect, setOnselect] = useState<any>(
    // data.id === undefined ? null : data.budget.id
    null
  );

  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");

  const [datePicker, setDatePicker]: any = useState<dayjs.Dayjs | null>(
    dataEdit.id === undefined
      ? dayjs(Date.now()).add(543, "year")
      : dayjs(dataEdit.yearEdu)
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [dataToCSV, setDataToCSV]: any = useState([]);

  const [onPrint, setOnPrint] = useState(false);

  const [saveId, setSaveId] = useState(0);

  useEffect(() => {
    getCategoryCourseS();
    getSubjects();
    getCountCategoryCourseSpecification();
    getCourseSpecificationByUser();
    getAllCourseSpecifications();
    getCourseSpecificationsById(Number(currentBranchId));
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length !== 0) {
        form.setFieldsValue({
          semester: dataEdit.semester,
          categoryId: dataEdit.categoryId,
          categoryName: dataEdit.categoryName,
          courseCode: dataEdit.courseCode,
          courseName: dataEdit.courseName,
          pdf: dataEdit.pdf,
          subjectsId: {
            value: dataEdit.subjectsId.toString(),
            label: `${dataEdit.courseCode} : ${dataEdit.courseName}`,
            // label: `รหัสรายวิชา: ${dataEdit.courseCode} ชื่อรายวิชา: ${dataEdit.courseName}`,
          },
          yearEdu: dataEdit.yearEdu,
          credit: dataEdit.credit,
          studyGroup: dataEdit.studyGroup,
          studentsAmount: dataEdit.studentsAmount,
        });
        setDatePicker(dayjs(dataEdit.yearEdu));
      } else {
        form.setFieldsValue({
          semester: null,
          categoryId: null,
          categoryName: null,
          courseCode: null,
          courseName: null,
          pdf: null,
          credit: null,
          studyGroup: null,
          studentsAmount: null,
        });
        setDatePicker(dayjs(Date.now()).add(543, "year"));
        setFile([]);
        setSectionFile([]);
        form.setFieldValue("subjectsId", null);
      }
    }
    setCourseCode("");
    setCourseName("");
  }, [dataEdit, form, isFormInitialized]);

  const onFinish = async (values: any) => {
    console.log("values", values);

    console.log("sectionFile", sectionFile);

    const formData = {
      id: dataEdit.id !== undefined ? saveId : 0,
      semester: values.semester,
      pdf: file || null,
      sectionFile: sectionFile || null,
      personnelId: bool ? dataEdit.personnelId : user?.userId,
      categoryCourseSpecificationId: values.categoryId,
      subjectsId: Number(values.subjectsId) || Number(values.subjectsId.value),
      yearEdu: datePicker.format(),
      credit: values.credit,
      studyGroup: values.studyGroup,
      studentsAmount: values.studentsAmount,
    };

    console.log("formData", formData);

    createUpdateCourseSpecification(formData).then(() => {
      setDataEdit([]);
      form.resetFields();
      handleSetMode();
    });
  };

  // console.log("user", JSON.stringify(user));

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const handleSetMode = () => setFormMode(!formMode);

  const onEdit = (e: any) => {
    handleEdit(e);
    setFile(e.pdf);
    setSectionFile(e.sectionFile);
    // setCategory(e.categoryCourseSpecificationId);
    setIsFormInitialized(true);
  };

  const columnsAcount: any = [
    {
      id: 6,
      title: "วันที่สร้าง",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (e: any) => <div>{formatDateThai(e, "")}</div>,
      width: 150,
    },
    {
      id: 2,
      title: "ชื่อหลักสูตร",
      dataIndex: "categoryBranch",
      key: "categoryBranch",
      align: "center",
    },
    {
      id: 1,
      title: "ภาคการศึกษาที่",
      dataIndex: "semesterWithYear",
      key: "semesterWithYear",
      align: "center",
      ...getColumnSearchProps("semesterWithYear", null, 3),
    },
    {
      id: 3,
      title: "ประเภท มคอ.",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
      filters: categoryCourseS.map((item) => ({
        text: item.name,
        value: item.id,
      })),
      onFilter: (value: string, record: any) => record.categoryId === value,
    },
    {
      id: 4,
      title: "รหัสรายวิชา",
      dataIndex: "courseCode",
      key: "courseCode",
      align: "center",
    },
    {
      id: 5,
      title: "ชื่อรายวิชา",
      dataIndex: "courseName",
      key: "courseName",
      align: "center",
    },
    {
      id: 5,
      title: "หน่วยกิต",
      dataIndex: "credit",
      key: "credit",
      align: "center",
    },
    {
      id: 5,
      title: "หมู่เรียน",
      dataIndex: "studyGroup",
      key: "studyGroup",
      align: "center",
    },
    {
      id: 5,
      title: "จำนวนนักศึกษา",
      dataIndex: "studentsAmount",
      key: "studentsAmount",
      align: "center",
    },
    {
      id: 7,
      title: "เอกสาร",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            color="whtie"
            href={pathImages.CourseSpecification + e.pdf}
            target="_blank"
          >
            ดู
          </Button>
        </HappyProvider>
      ),
      width: 80,
    },
    {
      id: 8,
      title: "แก้ไข",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: CourseSpecification) => (
        <MyButton functionOnClick={() => onEdit(e)} title="แก้ไข" />
        // <HappyProvider>
        //   <Button
        //     color="whtie"
        //     onClick={() => {
        //       handleEdit(e);
        //       setFile(e.pdf);
        //       setCategory(e.categoryCourseSpecificationId);
        //       setIsFormInitialized(true);
        //     }}
        //   >
        //     แก้ไข
        //   </Button>
        // </HappyProvider>
      ),
      width: 90,
    },
    {
      id: 9,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <MyRemovePop functionRemove={() => removeCourseSpecification(e.id)} />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Popconfirm
        //     title="ลบ มคอ."
        //     description="คุณยืนยันที่จะลบ มคอ. นี้ใช่ไหม"
        //     okText="ใช่ ลบเลย"
        //     onConfirm={() => removeCourseSpecification(e.id)}
        //     cancelText="ยกเลิก"
        //   >
        //     <Button color="whtie">ลบ</Button>
        //   </Popconfirm>
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  const onEditAdmin = (e: any) => {
    handleEdit(e);
    setFile(e.pdf);
    setSectionFile(e.sectionFile);
    // setCategory(e.categoryCourseSpecificationId);
    setIsFormInitialized(true);
  };

  const columnsAdmin: any = [
    {
      id: 2,
      title: "อาจารย์ผู้สอน",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      // render: (e: any) => (
      //   <div
      //     style={{
      //       display: "flex",
      //       alignItems: "center",
      //     }}
      //   >
      //     {/* <div style={{ marginRight: 10 }} className="image-on-print">
      //       {e.imageName ? (
      //         <Image
      //           height={30}
      //           width={30}
      //           style={{ borderRadius: 100 }}
      //           src={`${pathImages.personnel}${e.imageName}`}
      //         />
      //       ) : (
      //         <FaRegUser size={25} />
      //       )}
      //     </div> */}
      //     <div>
      //       <div>{e.fullName}</div>
      //     </div>
      //   </div>
      // ),
    },
    {
      id: 6,
      title: "วันที่สร้าง",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (e: any) => <div>{formatDateThai(e, "")}</div>,
      width: 150,
    },
    {
      id: 2,
      title: "ชื่อหลักสูตร",
      dataIndex: "categoryBranch",
      key: "categoryBranch",
      align: "center",
    },
    {
      id: 1,
      title: "ภาคการศึกษาที่",
      dataIndex: "semesterWithYear",
      key: "semesterWithYear",
      align: "center",
      ...getColumnSearchProps("semesterWithYear", null, 3),
    },
    {
      id: 3,
      title: "ประเภท มคอ.",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
      filters: categoryCourseS.map((item) => ({
        text: item.name,
        value: item.id,
      })),
      onFilter: (value: string, record: any) => record.categoryId === value,
    },
    {
      id: 4,
      title: "รหัสรายวิชา",
      dataIndex: "courseCode",
      key: "courseCode",
      align: "center",
    },
    {
      id: 5,
      title: "ชื่อรายวิชา",
      dataIndex: "courseName",
      key: "courseName",
      align: "center",
    },
    {
      id: 5,
      title: "หน่วยกิต",
      dataIndex: "credit",
      key: "credit",
      align: "center",
    },
    {
      id: 5,
      title: "หมู่เรียน",
      dataIndex: "studyGroup",
      key: "studyGroup",
      align: "center",
    },
    {
      id: 5,
      title: "จำนวนนักศึกษา",
      dataIndex: "studentsAmount",
      key: "studentsAmount",
      align: "center",
    },
    {
      id: 7,
      title: "เอกสาร",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            color="whtie"
            href={pathImages.CourseSpecification + e.pdf}
            target="_blank"
          >
            ดู
          </Button>
        </HappyProvider>
      ),
      width: 80,
    },
    {
      id: 8,
      title: "แก้ไข",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: CourseSpecification) => (
        <MyButton functionOnClick={() => onEditAdmin(e)} title="แก้ไข" />
        // <HappyProvider>
        //   <Button
        //     color="whtie"
        //     onClick={() => {
        //       handleEdit(e);
        //       setFile(e.pdf);
        //       setCategory(e.categoryCourseSpecificationId);
        //       setIsFormInitialized(true);
        //     }}
        //   >
        //     แก้ไข
        //   </Button>
        // </HappyProvider>
      ),
      width: 90,
    },
    {
      id: 6,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <MyRemovePop functionRemove={() => removeCourseSpecification(e.id)} />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Popconfirm
        //     placement="topRight"
        //     title="ลบ มคอ."
        //     description="คุณยืนยันที่จะลบ มคอ. นี้ใช่ไหม"
        //     okText="ใช่ ลบเลย"
        //     onConfirm={() => removeCourseSpecification(e.id)}
        //     cancelText="ยกเลิก"
        //   >
        //     <Button color="whtie">ลบ</Button>
        //   </Popconfirm>
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  const onChangeFile = async (info: any) => {
    const uploadedFileName = info.file.originFileObj;
    await uploadFile({ file: uploadedFileName }).then((e) => {
      setFile(e);
    });
  };

  const onChangeSectionFile = async (info: any) => {
    const uploadedFileName = info.file.originFileObj;
    await uploadFile({ file: uploadedFileName }).then((e) => {
      setSectionFile(e);
    });
  };

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    handleSetMode();
  };

  const options = categoryCourseS.map((item, i) => {
    return {
      key: i.toString(),
      label: item.name,
      // (
      //   <>
      //     <Row
      //       style={{
      //         display: "flex",
      //         justifyContent: "space-between",
      //       }}
      //     >
      //       <div>{item.name}</div>
      //       <div>
      //         <CloseOutlined
      //           className="hoverRemove"
      //           style={{ padding: 3, borderRadius: 50 }}
      //           onClick={() => {
      //             const find: any = categoryCourseSCount.find(
      //               (x: any) => x.item.id === item.id
      //             );

      //             console.log("ก่อน");

      //             console.log("find", find);

      //             if (find !== undefined) {
      //               console.log("!== undefined");
      //               if (find.count > 0) {
      //                 console.log("find.count > 0");

      //                 notify(
      //                   "ไม่สามารถลบได้เนื่องจากประเภท มคอ. นี้มีการใช้งานอยู่"
      //                 );
      //               } else {
      //                 console.log("สามารถลบได้");
      //                 removeCategoryCourseS(item.id).then(() => {
      //                   form.setFieldValue("categoryId", null);
      //                 });
      //               }
      //             } else {
      //               console.log("เป็นundefined");

      //               removeCategoryCourseS(item.id).then(() => {
      //                 form.setFieldValue("categoryId", null);
      //               });
      //               setCategory(null);
      //             }
      //           }}
      //         />
      //       </div>
      //     </Row>
      //   </>
      // ),
      value: item.id, // ส่งค่าที่ถูกเลือกไป
    };
  });

  const onSelectChange = (e: any) => {
    setOnselect(e);
  };

  const handleBack = () => {
    setOnselect(null);
    handleSetMode();
    form.resetFields();
    setDataEdit([]);
    setFile([]);
    setSectionFile([]);
    setIsFormInitialized(false);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const optionSubjects: any = subjects.map((item) => {
    return {
      value: item.id.toString(),
      label: `${item.courseCode} : ${item.courseName}`,
    };
  });

  const handleCreateSubjects = () => {
    if (courseCode === "" || courseName === "") {
      notify("กรุณากรอก รหัสรายวิชา หรือ ชื่อรายวิชา");
    } else {
      createUpdateSubjects(courseCode, courseName).then(() => {
        setCourseCode("");
        setCourseName("");
        notify("เพิ่มวิชาเรียนเสร็จสิ้น");
      });
    }
  };

  const mapCourseSpecification: any = (items: {
    item: CourseSpecification;
    branch: PersonnelinBranch[];
  }) => {
    let formData = {};

    const item: CourseSpecification = "item" in items ? items.item : items;

    console.log("item data", JSON.stringify(item));

    formData = {
      id: item.id,
      fullName:
        item?.personnel?.prefixes?.prefixName + item.personnel.fullName || null,
      imageName: item?.personnel?.image,
      createdAt: item?.createdAt,
      semester: item.semester, //
      categoryId: item.categoryCourseSpecificationId, //
      categoryName: item.categoryCourseSpecification.name,
      subjectsId: item.subjectsId,
      courseCode: item.subjects.courseCode,
      courseName: item.subjects.courseName,
      pdf: item.pdf, //
      personnelId: item.personnelId || null,
      categoryBranch: items.branch[0].branch.categoryBranch,
      semesterWithYear:
        item.semester + "/" + dayjs(item.yearEdu).format("YYYY"),
      yearEdu: item.yearEdu,
      credit: item.credit,
      studyGroup: item.studyGroup,
      studentsAmount: item.studentsAmount,
    };

    return { ...item, ...formData };
  };

  const data = (
    bool
      ? AllcourseSpecification
      : // Number(currentBranchId) === 1
        //   ? AllcourseSpecification
        //   : courseSpecificationinBranch
        courseSpecification
  ).map(mapCourseSpecification);

  const dataPrint = data.map((item: any) => ({
    fullName: item.fullName,
    categoryBranch: item.categoryBranch,
    categoryId: item.categoryId,
    categoryName: item.categoryName,
    courseCode: item.courseCode,
    courseName: item.courseName,
    credit: item.credit,
    semesterWithYear: item.semesterWithYear,
    studyGroup: item.studyGroup,
    studentsAmount: item.studentsAmount,
  }));

  const columnsPrint: any = [
    {
      id: 1,
      title: "อาจารย์ผู้สอน",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      id: 2,
      title: "ชื่อหลักสูตร",
      dataIndex: "categoryBranch",
      key: "categoryBranch",
      align: "center",
    },
    {
      id: 3,
      title: "ภาคการศึกษาที่",
      dataIndex: "semesterWithYear",
      key: "semesterWithYear",
      align: "center",
      ...getColumnSearchProps("semesterWithYear", null, 3),
    },
    {
      id: 4,
      title: "ประเภท มคอ.",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
      width: 130,
      filters: categoryCourseS.map((item) => ({
        text: item.name,
        value: item.id,
      })),
      onFilter: (value: string, record: any) => record.categoryId === value,
    },
    {
      id: 5,
      title: "รหัสรายวิชา",
      dataIndex: "courseCode",
      key: "courseCode",
      align: "center",
    },
    {
      id: 6,
      title: "ชื่อรายวิชา",
      dataIndex: "courseName",
      key: "courseName",
      align: "center",
    },
    {
      id: 7,
      title: "หน่วยกิต",
      dataIndex: "credit",
      key: "credit",
      align: "center",
      width: 90,
    },
    {
      id: 8,
      title: "หมู่เรียน",
      dataIndex: "studyGroup",
      key: "studyGroup",
      align: "center",
    },
    {
      id: 9,
      title: "จำนวนนักศึกษา",
      dataIndex: "studentsAmount",
      key: "studentsAmount",
      align: "center",
    },
  ];

  const header = [
    { label: "อาจารย์ผู้สอน", key: "fullName" },
    { label: "วันที่สร้าง", key: "createdAt" },
    { label: "ชื่อหลักสูตร", key: "categoryBranch" },
    { label: "ภาคการศึกษาที่", key: "semesterWithYear" },
    { label: "ประเภท มคอ.", key: "categoryName" },
    { label: "รหัสรายวิชา", key: "courseCode" },
    { label: "ชื่อรายวิชา", key: "courseName" },
    { label: "หน่วยกิต", key: "credit" },
    { label: "หมู่เรียน", key: "studyGroup" },
    { label: "จำนวนนักศึกษา", key: "studentsAmount" },
  ];

  const mapCSV: any = (item: any) => {
    let formData = {};

    formData = {
      fullName:
        item?.personnel?.prefixes?.prefixName + item.personnel.fullName || null,
      createdAt: formatDateThai(item?.createdAt, ""),
      categoryBranch: item.categoryBranch,
      semesterWithYear: `${item.semester}\t/${dayjs(item.yearEdu).format(
        "YYYY"
      )}`,
      categoryName: item.categoryCourseSpecification.name,
      courseCode: item.subjects.courseCode,
      courseName: item.subjects.courseName,
      credit: item.credit,
      studyGroup: item.studyGroup,
      studentsAmount: item.studentsAmount,
    };

    return { ...formData };
  };

  // const dataCSV: any = dataToCSV?.map(mapCSV);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChangeDate = (selectedDate: dayjs.Dayjs | null) => {
    console.log("datePicker selected : ", selectedDate);
    setDatePicker(selectedDate);
  };

  const goToPrint = () => {
    setOnPrint(!onPrint);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const generatePDF = () => {
    const element = document.getElementById("html-element-id-to-pdf"); // เปลี่ยน 'your-html-element-id' เป็น ID ขององค์ประกอบ HTML ที่คุณต้องการแปลงเป็น PDF
    html2pdf()
      .from(element)
      .save("มคอ" + ".pdf");
  };

  const generateWord = () => {
    const element: any = document.getElementById("html-element-id-to-word"); // เปลี่ยน 'your-html-element-id' เป็น ID ขององค์ประกอบ HTML ที่คุณต้องการแปลงเป็น PDF
    const dataTable = element.querySelector(".ant-table");
    const headers = Array.from(dataTable.querySelectorAll("thead th")).map(
      (th: any) => th.innerText
    );
    const rows = Array.from(dataTable.querySelectorAll("tbody tr")).map(
      (tr: any) =>
        Array.from(tr.querySelectorAll("td")).map((td: any) => td.innerText)
    );

    const table = new Table({
      rows: [
        new TableRow({
          children: headers.map(
            (header) =>
              new TableCell({
                children: [new Paragraph({ children: [new TextRun(header)] })],
              })
          ),
        }),
        ...rows.map(
          (row) =>
            new TableRow({
              children: row.map(
                (cell) =>
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun(cell)] }),
                    ],
                  })
              ),
            })
        ),
      ],
    });
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [table],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "มคอ.docx");
    });

    // html2pdf()
    //   .from(element)
    //   .save("มคอ" + ".docx");
  };

  const onSelectChangeTable = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);

    setSelectedRowKeys(newSelectedRowKeys);

    const formData: any = newSelectedRowKeys.map((item) => {
      const test = data.find((x: any) => x.id === item);

      console.log("test", test);
      return test;
    });

    setDataToCSV(formData?.map(mapCSV));
  };

  console.log("data", data);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChangeTable,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const steps: TourProps["steps"] = [
    {
      title: "หากไม่มีวิชาเรียน",
      description: "ให้ทำการเพิ่มรายวิชาใหม่ดังนี้",
      target: null,
    },
    {
      title: "1. กรอกรหัสรายวิชา",
      description: "กรอกรหัสรายวิชาที่ต้องการจะเพิ่ม",
      placement: "right",
      target: () => ref1.current,
    },
    {
      title: "2. กรอกชื่อรายวิชา",
      description:
        "กรอกชื่อรายวิชาที่ต้องการจะเพิ่ม จากนั้นให้กดเพื่มวิชาเรียน",
      placement: "right",

      target: () => ref2.current,
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        {bool && <MyTitleAdmin name={TitlePath.courseSpecification} />}
      </div>

      {formMode ? (
        <>
          <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
            <MyButton functionOnClick={handleBack} title="กลับ" />
            {/* <HappyProvider>
              <Button onClick={handleBack} color="whtie">
                กลับ
              </Button>
            </HappyProvider> */}
          </div>

          <Form
            form={form}
            name="profile"
            initialValues={{
              ...dataEdit,
              categoryId:
                dataEdit?.id !== undefined ? dataEdit?.categoryId : null,
              pdf: dataEdit?.id !== undefined ? dataEdit?.pdf : null,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <Form.Item
                      label="ภาคการศึกษาที่"
                      name="semester"
                      rules={rules("ภาคการศึกษาที่")}
                    >
                      <Select
                        // defaultValue="lucy"
                        placeholder="ภาคการศึกษา"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        options={[
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                          { value: "3", label: "3" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <Form.Item
                      label="ปีการศึกษา"
                      name="yearEdu"
                      // rules={rules("ปีการศึกษา")}
                    >
                      <ConfigProvider locale={locale}>
                        <DatePicker
                          // format="DD/MM/YYYY"
                          style={{
                            width: "100%",
                          }}
                          picker="year"
                          onChange={onChangeDate}
                          defaultValue={datePicker}
                          value={datePicker}
                          allowClear={false}
                        />
                      </ConfigProvider>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="วิชาเรียน (รหัสรายวิชา ชื่อรายวิชา)"
                      name="subjectsId"
                      rules={rules("วิชาเรียน")}
                    >
                      <Select
                        showSearch
                        placeholder="เลือกวิชาเรียน"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={optionSubjects}
                        allowClear
                        notFoundContent={<DataEmpty />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="ประเภท มคอ."
                      name="categoryId"
                      validateStatus={onError ? "error" : "success"}
                      rules={rules("ประเภท มคอ.")}
                      help={onError ? "กรุณาเลือกประเภท มคอ." : null}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="เลือกประเภท มคอ."
                        onChange={(e: any) => [
                          onSelectChange(e),
                          setOnError(false),
                        ]}
                        options={options}
                        allowClear
                        defaultValue={onSelect}
                        value={onSelect}
                        dropdownRender={(menu) => {
                          return (
                            <>
                              {menu}
                              <Divider style={{ margin: "8px 0" }} />
                              <Space style={{ padding: "0 8px 4px" }}>
                                <Input
                                  placeholder="เลือกประเภท มคอ."
                                  ref={inputRef}
                                  defaultValue={category}
                                  value={category}
                                  onChange={(e: any) =>
                                    setCategory(e.target.value)
                                  }
                                  onKeyDown={(e) => e.stopPropagation()}
                                />
                                <Button
                                  type="text"
                                  icon={<PlusOutlined />}
                                  onClick={() => {
                                    var result = categoryCourseS.find(
                                      (item) => item.name === category
                                    );

                                    category
                                      ? result === undefined
                                        ? [
                                            createUpdateCategoryCourseS(
                                              category
                                            ),
                                            setCategory(null),
                                          ]
                                        : alert("มีประเภท มคอ. นี้อยู่แล้ว")
                                      : alert("กรุณากรอกประเภท มคอ.");
                                  }}
                                >
                                  เพิ่ม
                                </Button>
                              </Space>
                            </>
                          );
                        }}
                        notFoundContent={<DataEmpty />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="หมู่เรียน"
                      name="studyGroup"
                      rules={rules("หมู่เรียน")}
                    >
                      <Input placeholder="หมู่เรียน" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="หน่วยกิต"
                      name="credit"
                      rules={rules("หน่วยกิต")}
                    >
                      <Input placeholder="หน่วยกิต" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="จำนวนนักศึกษา"
                      name="studentsAmount"
                      rules={rules("จำนวนนักศึกษา")}
                    >
                      <Input placeholder="จำนวนนักศึกษา" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="ไฟล์ PDF (มคอ.)"
                      name="pdf"
                      rules={[{ required: true, message: "กรุณากรอกไฟล์ PDF" }]}
                    >
                      {file?.length !== 0 ? (
                        <Tooltip
                          placement="left"
                          title={file?.length !== 0 ? file : "ว่างเปล่า"}
                        >
                          <Button
                            icon={<UploadOutlined />}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {file}
                            </div>
                          </Button>
                        </Tooltip>
                      ) : (
                        <Upload {...props} onChange={onChangeFile}>
                          <Tooltip
                            placement="left"
                            title={file?.length !== 0 ? file : "ว่างเปล่า"}
                          >
                            <Button
                              icon={<UploadOutlined />}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              อัพโหลดไฟล์
                            </Button>
                          </Tooltip>
                        </Upload>
                      )}
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="ผลการประเมินความพึงพอใจของผู้เรียน"
                      name="sectionFile"
                      // rules={[{ required: true, message: "กรุณากรอกไฟล์ PDF" }]}
                    >
                      {sectionFile?.length !== 0 && sectionFile !== null ? (
                        <Tooltip
                          placement="left"
                          title={
                            sectionFile?.length !== 0 && sectionFile !== null
                              ? sectionFile
                              : "ว่างเปล่า"
                          }
                        >
                          <Button
                            icon={<UploadOutlined />}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {sectionFile}
                            </div>
                          </Button>
                        </Tooltip>
                      ) : (
                        <Upload {...props} onChange={onChangeSectionFile}>
                          <Tooltip
                            placement="left"
                            title={
                              sectionFile?.length !== 0 && sectionFile !== null
                                ? sectionFile
                                : "ว่างเปล่า"
                            }
                          >
                            <Button
                              icon={<UploadOutlined />}
                              style={{
                                width: "100%",
                              }}
                            >
                              อัพโหลดไฟล์
                            </Button>
                          </Tooltip>
                        </Upload>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                  <Col span={24}>
                    <Form.Item
                      label="รหัสรายวิชา"
                      // name="courseCode"
                      // rules={rules("รหัสรายวิชา")}
                    >
                      <div ref={ref1}>
                        <Input
                          onChange={(e) => setCourseCode(e.target.value)}
                          value={courseCode}
                          placeholder="รหัสรายวิชา"
                        />
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="ชื่อรายวิชา"
                      // name="courseName"
                      // rules={rules("ชื่อรายวิชา")}
                    >
                      <div ref={ref2}>
                        <Input
                          onChange={(e) => setCourseName(e.target.value)}
                          value={courseName}
                          placeholder="ชื่อรายวิชา"
                        />
                      </div>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                      <Col>
                        <HappyProvider>
                          <Button
                            onClick={handleCreateSubjects}
                            color="whtie"
                            style={{
                              borderRadius: 50,
                            }}
                          >
                            เพิ่มวิชาเรียน
                          </Button>
                        </HappyProvider>
                      </Col>
                      <Col>
                        <HappyProvider>
                          <Button
                            type="primary"
                            onClick={() => setTour(JSON.stringify(true))}
                            style={{
                              borderRadius: 50,
                            }}
                          >
                            วิธีการใช้งาน
                          </Button>
                        </HappyProvider>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Tour
                  open={tour}
                  onClose={() => setTour(JSON.stringify(false))}
                  steps={steps}
                />
              </Col>
            </Row>

            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}
              style={{
                width: 180,
              }}
            >
              <Col span={12}>
                <div
                  style={{
                    marginTop: 20,
                  }}
                  onClick={() => setSaveId(dataEdit.id)}
                >
                  <MySave />
                </div>
              </Col>
              {dataEdit.id !== undefined && (
                <Col span={12}>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <HappyProvider>
                      <Button
                        color="white"
                        type="primary"
                        onClick={() => setSaveId(0)}
                        style={{
                          borderRadius: 50,
                        }}
                        htmlType="submit"
                      >
                        ส่งซ้ำ
                      </Button>
                    </HappyProvider>
                  </div>
                </Col>
              )}
            </Row>

            {/* <HappyProvider>
              <Button
                color="whtie"
                htmlType="submit"
                style={{
                  marginTop: 20,
                }}
              >
                บันทึก
              </Button>
            </HappyProvider> */}
          </Form>
        </>
      ) : (
        <>
          {!bool && (
            <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
              <MyButton
                functionOnClick={() => {
                  handleSetMode();
                  setIsFormInitialized(true);
                }}
                title="เพิ่ม"
              />
              {/* <HappyProvider>
                <Button
                  onClick={() => {
                    handleSetMode();
                    setIsFormInitialized(true);
                  }}
                  color="whtie"
                >
                  เพิ่ม
                </Button>
              </HappyProvider> */}
            </div>
          )}

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
            {!onPrint && (
              <Col>
                <div style={{ marginTop: 7 }}>
                  {hasSelected ? `จำนวนที่เลือก ${selectedRowKeys.length}` : ""}
                </div>
              </Col>
            )}

            {onPrint && (
              <Col>
                <HappyProvider>
                  <Button
                    onClick={goToPrint}
                    style={{
                      borderRadius: 50,
                    }}
                  >
                    กลับ
                  </Button>
                </HappyProvider>
              </Col>
            )}

            {!onPrint ? (
              <Col>
                <HappyProvider>
                  <Button
                    onClick={goToPrint}
                    style={{
                      borderRadius: 50,
                    }}
                    disabled={dataToCSV.length === 0}
                  >
                    พิมพ์ หรือ ดาวโหลด
                  </Button>
                </HappyProvider>
              </Col>
            ) : (
              <>
                <Col>
                  <HappyProvider>
                    <Button
                      key="print"
                      onClick={handlePrint}
                      style={{
                        borderRadius: 50,
                        backgroundColor: "gray",
                        color: "white",
                      }}
                    >
                      พิมพ์ <PrinterOutlined />
                    </Button>
                  </HappyProvider>
                </Col>

                <Col>
                  <HappyProvider>
                    <Button
                      style={{
                        borderRadius: 50,
                        backgroundColor: "green",
                        color: "white",
                      }}
                    >
                      <CSVLink
                        headers={header}
                        filename={"มคอ.csv"}
                        data={dataToCSV}
                        className="btn btn-primary"
                      >
                        ดาวโหลด CSV
                        <FaRegFileExcel
                          style={{
                            marginLeft: 10,
                            position: "relative",
                            top: 2,
                          }}
                        />
                      </CSVLink>
                    </Button>
                  </HappyProvider>
                </Col>

                <Col>
                  <HappyProvider>
                    <Button
                      key="print"
                      onClick={generateWord}
                      style={{
                        borderRadius: 50,
                        backgroundColor: "blue",
                        color: "white",
                      }}
                    >
                      ดาวโหลด word
                      <FaRegFileWord
                        style={{ marginLeft: 10, position: "relative", top: 2 }}
                      />
                    </Button>
                  </HappyProvider>
                </Col>

                <Col>
                  <HappyProvider>
                    <Button
                      key="print"
                      onClick={generatePDF}
                      style={{
                        borderRadius: 50,
                        backgroundColor: "red",
                        color: "white",
                      }}
                    >
                      ดาวโหลด pdf
                      <FaRegFilePdf
                        style={{ marginLeft: 10, position: "relative", top: 3 }}
                      />
                    </Button>
                  </HappyProvider>
                </Col>
              </>
            )}
          </Row>

          <div id="html-element-id-to-word">
            <div
              ref={componentRef as React.Ref<HTMLDivElement>}
              id="html-element-id-to-pdf"
            >
              <DataTable
                data={onPrint ? dataToCSV : data}
                columns={
                  !onPrint
                    ? bool
                      ? columnsAdmin
                      : columnsAcount
                    : columnsPrint
                }
                sizeX={!onPrint ? 2300 : 0}
                rowSelection={!onPrint && rowSelection}
                pagination={
                  onPrint
                    ? false
                    : {
                        pageSize: 6,
                      }
                }
                runNumber={false}
                onPrint={onPrint}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default observer(CourseSpecificationAccount);
