export default function BadgeList({vegan, vegetarian, glutenFree}){
    return(
        <div className="flex flex-wrap gap-2 mt-2">
      {vegan && <span className="badge bg-green-500 text-white p-1">Vegan</span>}
      {vegetarian && <span className="badge bg-yellow-400 text-white p-1">Vegetarian</span>}
      {glutenFree && <span className="badge bg-blue-400 text-white p-1">Gluten-Free</span>}
    </div>
    );
}