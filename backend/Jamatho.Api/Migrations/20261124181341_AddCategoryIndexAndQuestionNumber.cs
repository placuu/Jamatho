using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Jamatho.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryIndexAndQuestionNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryIndex",
                table: "Categories",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryIndex",
                table: "Categories");
        }
    }
}
