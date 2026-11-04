using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Jamatho.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCkeExamModifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizAttemptDetails_QuizAnswers_SelectedAnswerId",
                table: "QuizAttemptDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Quizzes_Lessons_LessonId",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_Quizzes_LessonId",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_QuizAttemptDetails_AttemptId",
                table: "QuizAttemptDetails");

            migrationBuilder.DropIndex(
                name: "IX_QuizAttemptDetails_SelectedAnswerId",
                table: "QuizAttemptDetails");

            migrationBuilder.DropColumn(
                name: "SelectedAnswerId",
                table: "QuizAttemptDetails");

            migrationBuilder.AlterColumn<Guid>(
                name: "LessonId",
                table: "Quizzes",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<string>(
                name: "QuizType",
                table: "Quizzes",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "TOPIC");

            migrationBuilder.AddColumn<int>(
                name: "TimeLimitMinutes",
                table: "Quizzes",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Quizzes",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Points",
                table: "QuizQuestions",
                type: "integer",
                nullable: false,
                defaultValue: 1,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "QuizQuestions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Explanation",
                table: "QuizQuestions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "QuizQuestions",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuestionType",
                table: "QuizQuestions",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "SINGLE_CHOICE");

            migrationBuilder.AddColumn<int>(
                name: "AwardedPoints",
                table: "QuizAttemptDetails",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "QuizAnswerId",
                table: "QuizAttemptDetails",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SubQuestionGroup",
                table: "QuizAnswers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_LessonId",
                table: "Quizzes",
                column: "LessonId",
                unique: true,
                filter: "\"LessonId\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_QuizQuestions_CategoryId",
                table: "QuizQuestions",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizAttemptDetails_AttemptId_QuestionId",
                table: "QuizAttemptDetails",
                columns: new[] { "AttemptId", "QuestionId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuizAttemptDetails_QuizAnswerId",
                table: "QuizAttemptDetails",
                column: "QuizAnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizAttemptDetails_QuizAnswers_QuizAnswerId",
                table: "QuizAttemptDetails",
                column: "QuizAnswerId",
                principalTable: "QuizAnswers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizQuestions_Categories_CategoryId",
                table: "QuizQuestions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Quizzes_Lessons_LessonId",
                table: "Quizzes",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizAttemptDetails_QuizAnswers_QuizAnswerId",
                table: "QuizAttemptDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizQuestions_Categories_CategoryId",
                table: "QuizQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_Quizzes_Lessons_LessonId",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_Quizzes_LessonId",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_QuizQuestions_CategoryId",
                table: "QuizQuestions");

            migrationBuilder.DropIndex(
                name: "IX_QuizAttemptDetails_AttemptId_QuestionId",
                table: "QuizAttemptDetails");

            migrationBuilder.DropIndex(
                name: "IX_QuizAttemptDetails_QuizAnswerId",
                table: "QuizAttemptDetails");

            migrationBuilder.DropColumn(
                name: "QuizType",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "TimeLimitMinutes",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "QuizQuestions");

            migrationBuilder.DropColumn(
                name: "Explanation",
                table: "QuizQuestions");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "QuizQuestions");

            migrationBuilder.DropColumn(
                name: "QuestionType",
                table: "QuizQuestions");

            migrationBuilder.DropColumn(
                name: "AwardedPoints",
                table: "QuizAttemptDetails");

            migrationBuilder.DropColumn(
                name: "QuizAnswerId",
                table: "QuizAttemptDetails");

            migrationBuilder.DropColumn(
                name: "SubQuestionGroup",
                table: "QuizAnswers");

            migrationBuilder.AlterColumn<Guid>(
                name: "LessonId",
                table: "Quizzes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Points",
                table: "QuizQuestions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldDefaultValue: 1);

            migrationBuilder.AddColumn<Guid>(
                name: "SelectedAnswerId",
                table: "QuizAttemptDetails",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_LessonId",
                table: "Quizzes",
                column: "LessonId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuizAttemptDetails_AttemptId",
                table: "QuizAttemptDetails",
                column: "AttemptId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizAttemptDetails_SelectedAnswerId",
                table: "QuizAttemptDetails",
                column: "SelectedAnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizAttemptDetails_QuizAnswers_SelectedAnswerId",
                table: "QuizAttemptDetails",
                column: "SelectedAnswerId",
                principalTable: "QuizAnswers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Quizzes_Lessons_LessonId",
                table: "Quizzes",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
