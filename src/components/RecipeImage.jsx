export default function RecipeImage({image, title, fallbackImg}){
    return(
        <div className="lg:w-1/2 card bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={image || fallbackImg}
        alt={title}
        className="w-full h-64 lg:h-full object-cover"
        onError={(e) => { e.currentTarget.src = fallbackImg; }}
      />
    </div>
    );
}