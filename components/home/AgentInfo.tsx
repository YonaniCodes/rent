import { Button } from "../ui/button";

export default function ListerInfo({
  listedBy,
}: {
  listedBy: { photo?: string; name: string; phone?: string; username?: string };
}) {
  console.log(listedBy);
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      {/* Agent Info */}
      <h3 className="text-lg font-semibold mb-3">Contact Agent</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {listedBy.photo && (
            <img
              src={listedBy.photo}
              alt={listedBy.name}
              className="w-12 h-12 rounded-full mr-3"
            />
          )}
          <div>
            <div className="font-medium">{listedBy.name}</div>
            <div className="text-sm text-gray-600">{listedBy.phone}</div>
            <div className="text-sm text-gray-600">{listedBy.username}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Call</Button>
          <Button>Email</Button>
        </div>
      </div>
    </div>
  );
}
