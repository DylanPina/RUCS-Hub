import StatGrid from "../../components/selected-course/stat_grid";
import Hero from "../../components/selected-course/hero";
import Review from "../../components/selected-course/review";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Hero />
      <StatGrid />
      <div className="font-bold text-3xl">Course Reviews</div>
      <Review
        title="Intro to AI was cool"
        semester="Fall 2023"
        dateTime="2023-12-15T09:00:00"
        ratings={{
          overallRating: 4,
          difficulty: 3,
          workload: 69,
          textbook: 3,
          lectures: 2,
          professor: 5,
          piazzaSupport: 0,
        }}
        description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat magnam possimus autem at unde impedit, sapiente odit. Itaque labore eos blanditiis atque provident rem molestias ab totam, quidem, veniam sint."
      />
    </div>
  );
}
