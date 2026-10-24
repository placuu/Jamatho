var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("jamatho-postgres")
    .WithDataVolume("jamatho_postgres_data")
    .WithPgAdmin();

var jamathoDB = postgres.AddDatabase("jamathoDB");

builder.AddProject<Projects.Jamatho_Api>("jamatho-api")
    .WithReference(jamathoDB)
    .WaitFor(jamathoDB);

builder.Build().Run();
