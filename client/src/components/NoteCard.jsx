import { Link } from "react-router-dom";

function NoteCard() {
  return (
    <div className="flex flex-col gap-3">
      <Link to="/notes/1" className="my-3">
        <h3 className="px-9 text-sm font-bold">This is the title</h3>

        <ul className="my-4 flex w-full flex-wrap items-center gap-2 px-9 text-center">
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">working</li>
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">server </li>
        </ul>

        <p className="px-9">21 May, 2025</p>
      </Link>
      <hr class="h-px border-gray-300 bg-gray-200 dark:bg-gray-300" />
      <Link to="/notes/2" className="my-3">
        <h3 className="px-9 text-sm font-bold">This is the title2</h3>

        <ul className="my-4 flex w-full flex-wrap items-center gap-2 px-9 text-center">
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">working2</li>
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">
            server2 rendering
          </li>
        </ul>

        <p className="px-9">21 May, 2025</p>
      </Link>


      <hr class="h-px border-gray-300 bg-gray-200 dark:bg-gray-300" />
      <Link to="/notes/2" className="my-3">
        <h3 className="px-9 text-sm font-bold">This is the title2</h3>

        <ul className="my-4 flex w-full flex-wrap items-center gap-2 px-9 text-center">
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">working2</li>
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">
            server2 rendering
          </li>
        </ul>

        <p className="px-9">21 May, 2025</p>
      </Link>
      <hr class="h-px border-gray-300 bg-gray-200 dark:bg-gray-300" />
      <Link to="/notes/2" className="my-3">
        <h3 className="px-9 text-sm font-bold">This is the title2</h3>

        <ul className="my-4 flex w-full flex-wrap items-center gap-2 px-9 text-center">
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">working2</li>
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">
            server2 rendering
          </li>
        </ul>

        <p className="px-9">21 May, 2025</p>
      </Link>
      <hr class="h-px border-gray-300 bg-gray-200 dark:bg-gray-300" />
      <Link to="/notes/2" className="my-3">
        <h3 className="px-9 text-sm font-bold">This is the title2</h3>

        <ul className="my-4 flex w-full flex-wrap items-center gap-2 px-9 text-center">
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">working2</li>
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">
            server2 rendering
          </li>
        </ul>

        <p className="px-9">21 May, 2025</p>
      </Link>
      <hr class="h-px border-gray-300 bg-gray-200 dark:bg-gray-300" />
      <Link to="/notes/2" className="my-3">
        <h3 className="px-9 text-sm font-bold">This is the title2</h3>

        <ul className="my-4 flex w-full flex-wrap items-center gap-2 px-9 text-center">
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">working2</li>
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">
            server2 rendering
          </li>
        </ul>

        <p className="px-9">21 May, 2025</p>
      </Link>
    </div>
  );
}

export default NoteCard;
