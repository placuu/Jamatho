FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["Jamatho.Api/Jamatho.Api.csproj", "Jamatho.Api/"]
COPY ["Jamatho.ServiceDefaults/Jamatho.ServiceDefaults.csproj", "Jamatho.ServiceDefaults/"]
RUN dotnet restore "Jamatho.Api/Jamatho.Api.csproj"

COPY . .
WORKDIR "/src/Jamatho.Api"
RUN dotnet publish "Jamatho.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Jamatho.Api.dll"]