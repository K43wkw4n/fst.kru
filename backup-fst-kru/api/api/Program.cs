using api.Data;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using System.Text;

//ใส่หน้า index
//path_on_server = https://tee.kru.ac.th/cs64/s18/fst-kru;
//path_on_server = https://coms.kru.ac.th/cs64/s18/fst-kru;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

#region JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new
    TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = false,
        IssuerSigningKey = new
    SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Token"]))
    };
});

//builder.Services.AddAuthentication().AddJwtBearer(options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = false,
//        ValidateAudience = false,
//        ValidateIssuerSigningKey = false,
//        //ValidIssuer = builder.Configuration["Jwt:Issuer"],     //Domain server 
//        //ValidAudience = builder.Configuration["Jwt:Audience"], //Domain Client
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
//            builder.Configuration.GetSection("AppSettings:Token").Value!))
//    };
//});
#endregion

builder.Services.AddDbContext<Context>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
 
#region Cors
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                          policy =>
                          {
                              policy.AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowCredentials()
                                    //.WithOrigins("http://localhost:3000")
                                    .SetIsOriginAllowed(x => true);
                          });
});
//AllowCredentials() ͹حҵ��� client ��ء���ͧ Api �� 
#endregion

#region Auto Add Service
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory(containerBuilder =>
{
    containerBuilder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
    .Where(x => x.Name.EndsWith("Service"))
    .AsImplementedInterfaces()
    .InstancePerLifetimeScope();
}));
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseCors(MyAllowSpecificOrigins);
app.MapFallbackToController("Index", "Fallback");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
