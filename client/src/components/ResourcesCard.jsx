import { Globe, ExternalLink } from "lucide-react";

function ResourcesCard() {
  const resources = [
    {
      title: "YouTube Lecture",
      type: "Video",
    },
    {
      title: "Wikipedia Article",
      type: "Reference",
    },
    {
      title: "GeeksforGeeks",
      type: "Tutorial",
    },
    {
      title: "Official Documentation",
      type: "Docs",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="text-cyan-600" size={24} />
        <h2 className="text-2xl font-bold">Study Resources</h2>
      </div>

      <div className="space-y-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 rounded-xl border hover:bg-slate-50 transition"
          >
            <div>
              <h3 className="font-semibold">{resource.title}</h3>
              <p className="text-sm text-gray-500">{resource.type}</p>
            </div>

            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              Open
              <ExternalLink size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesCard;