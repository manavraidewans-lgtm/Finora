
import Button from "./Button";

function ButtonStack() {
    return (
        <div className="h-[30%] md:h-[20%] lg:h-[15%] w-full p-2 flex justify-start items-center gap-8 md:gap-16 lg:gap-24">

            <Button
                BackgroundColor="bg-[#967056]"
                Text="Try Your Spending"
                className="text-[#e9d3c6] font-bold"
            />

            <Button
                BackgroundColor="bg-[#f7f4ef]"
                Text="Explore Features"
                className="text-[#887971] font-bold"
            />

        </div>
    );
}

export default ButtonStack;

