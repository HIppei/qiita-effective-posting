export default function Header() {
  return (
    <div className="my-5 flex justify-center items-center">
      <input className="border rounded-l-lg text-lg pl-3 py-2 focus:outline-none" placeholder="Your access token" />
      <button className="text-lg border rounded-r-lg px-3 py-2 hover:bg-gray-200">Update</button>
    </div>
  );
}
