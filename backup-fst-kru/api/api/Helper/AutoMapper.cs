using api.DTO.Account;
using api.DTO.OrderSlipMapper;
using api.DTO.PaymentVoucherMapper;
using api.DTO.ParcelMapper;
using api.Models.Person;
using api.Models.Parcel;
using AutoMapper;
using api.Models.system;
using api.DTO.systemSetting;
using api.Models.NEWS;
using api.DTO.fst;
using api.Models.fst;
using api.Models.jobHistory;
using api.DTO.job;
using api.DTO.project;
using api.Models.project;
using api.Models.researchAndProject;
using api.DTO.researchAndProject;
using api.Models.Course;
using api.DTO.Course;
using api.Models.director;
using api.DTO.AnnualDirector;

namespace api.Helper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Parcel, ParcelRequest>();
            CreateMap<ParcelRequest, Parcel>();

            CreateMap<Personnel, RegisterDto>();
            CreateMap<RegisterDto, Personnel>();

            CreateMap<OrderSlipRequest, OrderSlip>();
            CreateMap<ItemsRequest, OrderSlipItem>();

            CreateMap<PaymentVoucherRequest, PaymentVoucher>();
            CreateMap<PaymentVoucherItemRequest, PaymentVoucherItem>();

            CreateMap<SystemSettingDto, SystemSetting>();
            CreateMap<SlideShowDto, SlideShow>();
            CreateMap<NewsDto, News>();

            CreateMap<WeLearnDto, WeLearn>();

            CreateMap<PersonnelDto, Personnel>();

            CreateMap<BranchDto, Branch>();

            CreateMap<CreateStudentDto, Student>();
            CreateMap<EditStudentDto, Student>();

            CreateMap<CurriculumDto, Curriculum>()
                .ForMember(x => x.SubjectGroups, opt => opt.MapFrom(src => src.SubjectGroups))
                .ForMember(x => x.GeneralTopics, opt => opt.MapFrom(src => src.GeneralTopics));

            CreateMap<SubjectGroupDto, SubjectGroup>()
                .ForMember(x => x.SubSubjectGroups, opt => opt.MapFrom(src => src.SubSubjectGroups));

            CreateMap<SubSubjectGroupDto, SubSubjectGroup>();

            CreateMap<GeneralTopicsDto, GeneralTopic>()
                .ForMember(x => x.SubGeneralTopics, opt => opt.MapFrom(src => src.SubGeneralTopics));

            CreateMap<SubGeneralTopicsDto, SubGeneralTopic>();

            CreateMap<JobHistoryDto, JobHistory>();

            CreateMap<ProjectDto, Project>()
                .ForMember(x => x.Consultants, opt => opt.MapFrom(src => src.Consultants));

            CreateMap<ConsultantDto, Consultant>();

            CreateMap<JobHistoryDto, JobHistory>();

            CreateMap<ResearchAndProjectDto, ResearchAndProject>();

            CreateMap<CourseSpecificationDto, CourseSpecification>();

            CreateMap<AnnualDirectorDto, AnnualDirector>();
            CreateMap<DirectorDto, Director>();

            CreateMap<SectionDto, Section>()
               .ForMember(x => x.Subsections, opt => opt.MapFrom(src => src.Subsections));

            CreateMap<SubsectionDto, Subsection>();

            CreateMap<DirectorTypeDto, DirectorType>()
                .ForMember(x => x.AnnualDirectors, opt => opt.MapFrom(src => src.AnnualDirectors));

            CreateMap<AnnualDirectorDto, AnnualDirector>();

            CreateMap<OrderSlipDto, OrderSlip>()
                .ForMember(x => x.OrderSlipItems, opt => opt.MapFrom(src => src.OrderSlipItems));

            CreateMap<OrderSlipItemsDto, OrderSlipItem>();

            CreateMap<CourseSpecification, CourseSpecificationRespone>();
            CreateMap<Personnel, PersonnelRespone>();
            CreateMap<PersonnelinBranch, PersonnelinBranchRespone>();
        }
    }
}
