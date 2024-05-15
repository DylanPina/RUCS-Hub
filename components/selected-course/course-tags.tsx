export default function CourseTags() {
  const tags = [
    { name: "Exams", info: "Easy" },
    { name: "Homework", info: "The weak will perish" },
    { name: "Fall", info: "Offered" },
    { name: "Example Tag", info: "Information about Example" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-12">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="relative group cursor-pointer bg-stone-800 text-white rounded-full overflow-hidden px-4 py-1 flex items-center"
        >
          <span className="text-sm font-medium">{tag.name}</span>
          <div className="absolute top-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded overflow-hidden p-2 mt-1">
            {tag.info}
          </div>
        </div>
      ))}
    </div>
  );
}
