// import {
//   getAllCourseListingWebReg,
//   mergeCourseListingBySubjectCourseCode,
// } from "@/lib/data/webreg";
// import { CourseWebRegListing } from "@/lib/definitions/course";
// import { titleCase } from "@/lib/utils";
//
// export async function GET() {
//   const courseListings = await getAllCourseListingWebReg();
//   const mergedCourseListings = mergeCourseListingBySubjectCourseCode(
//     Array.from(courseListings.values()),
//   );
//
//   const courseListingsArray = Array.from(mergedCourseListings.values()).flat();
//   const courseListingsFormatted = courseListingsArray.map(
//     (courseListing: CourseWebRegListing) => {
//       return {
//         subjectCode: courseListing.subjectCode,
//         code: courseListing.code,
//         name: titleCase(courseListing.title).replace("Ii", "II"),
//         credits: courseListing.credits,
//       };
//     },
//   );
//
//   courseListingsFormatted.sort((a, b) => {
//     if (a.subjectCode < b.subjectCode) {
//       return -1;
//     }
//     if (a.subjectCode > b.subjectCode) {
//       return 1;
//     }
//     if (a.code < b.code) {
//       return -1;
//     }
//     if (a.code > b.code) {
//       return 1;
//     }
//     return 0;
//   });
//
//   return new Response(JSON.stringify(courseListingsFormatted));
// }
//

export async function GET() {
  return new Response("Test");
}
