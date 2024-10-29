import { ProfilePicture } from "../../components";

interface SingleReviewProps {
  avatar: string;
  userName: string;
  rating: number;
  className?: string;
  title: string;
  review: string;
  currentUser: string | null;
  reviewId: string;
  onDelete: (reviewId: string) => void;
  onEdit: (
    reviewId: string,
    title: string,
    content: string,
    rating: number
  ) => void;
}

export const SingleReview: React.FC<SingleReviewProps> = ({
  avatar,
  userName,
  rating,
  title,
  review,
  currentUser,
  reviewId,
  onDelete,
  onEdit,
}) => {
  const handleDelete = () => {
    onDelete(reviewId);
  };

  const handleEdit = () => {
    onEdit(reviewId, title, review, rating);
  };

  return (
    <div className="flex flex-col justify-between m-4 min-w-[300px] max-w-[600px]">
      <div className="flex flex-row justify-between items-center my-2">
        <div className="flex flex-row items-center">
          <ProfilePicture avatar={avatar} className="w-10 h-10 rounded-full" />
          <span className="font-dosis font-semibold mx-3">{userName}</span>
        </div>
        <div className="bg-principal text-title py-1 px-4 rounded-3xl flex flex-row items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 48 48"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="4"
              d="m23.999 5l-6.113 12.478L4 19.49l10.059 9.834L11.654 43L24 36.42L36.345 43L33.96 29.325L44 19.491l-13.809-2.013z"
            />
          </svg>
          {rating}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <p className="truncate text-lg font-dosis">{title}</p>
          <p className="text-base font-dosis text-text">{review}</p>
        </div>
        {userName === currentUser && (
          <div className="flex flex-row gap-4">
            <div
              onClick={handleEdit}
              className=" text-principal hover:text-title cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
                />
              </svg>
            </div>
            <div
              onClick={handleDelete}
              className=" text-principal hover:text-title cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path
                    strokeLinecap="round"
                    d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79s-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9"
                  />
                  <path d="M6.5 6h.11a2 2 0 0 0 1.83-1.32l.034-.103l.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 0 1 1.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 0 1 1.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0 0 17.5 6" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
