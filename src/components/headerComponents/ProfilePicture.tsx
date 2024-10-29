interface ProfilePictureProps{
    avatar: string;
    className?:string;
}

export const ProfilePicture:React.FC<ProfilePictureProps> = ({avatar, className}) => {
  return (
    <div>
      <img
        className={className}
        src={avatar}
        alt="Avatar"
      />
    </div>
  );
};
