using api.Data;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using System.Text; 

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
builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        //ValidIssuer = builder.Configuration["Jwt:Issuer"],     //Domain server 
        //ValidAudience = builder.Configuration["Jwt:Audience"], //Domain Client
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration.GetSection("AppSettings:Token").Value!))
    };
});
#endregion

builder.Services.AddDbContext<Context>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddAutoMapper(typeof(Program).Assembly);

#region Auto Add Service
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory(containerBuilder =>
{
    containerBuilder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
    .Where(x => x.Name.EndsWith("Service"))
    .AsImplementedInterfaces()
    .InstancePerLifetimeScope();
}));
#endregion

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
