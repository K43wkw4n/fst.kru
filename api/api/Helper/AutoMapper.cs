using api.DTO;
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

            CreateMap<OrderSlip, OrderSlipRequest>();
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

            CreateMap<CurriculumDto, Curriculum>()
                .ForMember(dest => dest.SubjectGroups, opt => opt.MapFrom(src => src.SubjectGroups))
                .ForMember(dest => dest.GeneralTopics, opt => opt.MapFrom(src => src.GeneralTopics));

            CreateMap<SubjectGroupDto, SubjectGroup>()
                .ForMember(dest => dest.SubSubjectGroups, opt => opt.MapFrom(src => src.SubSubjectGroups));

            CreateMap<SubSubjectGroupDto, SubSubjectGroup>();

            CreateMap<GeneralTopicsDto, GeneralTopic>()
                .ForMember(dest => dest.SubGeneralTopics, opt => opt.MapFrom(src => src.SubGeneralTopics));

            CreateMap<SubGeneralTopicsDto, SubGeneralTopic>();
        }
    }
}
