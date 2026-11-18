using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Jamatho.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionNumberToQuizQuestion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuestionNumber",
                table: "QuizQuestions",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuestionNumber",
                table: "QuizQuestions");
        }
    }
}
