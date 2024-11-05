const ProfileImage = ({ user }) => {
    const alphabetColors = {
        A: "#FF5733",
        B: "#33FF57",
        C: "#3357FF",
        D: "#FF33A6",
        E: "#FF9D33",
        F: "#A6FF33",
        G: "#33FFA6",
        H: "#5733FF",
        I: "#FF33F0",
        J: "#33FFF0",
        K: "#FF5733",
        L: "#57FF33",
        M: "#5733FF",
        N: "#33FF57",
        O: "#33A6FF",
        P: "#FF33A6",
        Q: "#9D33FF",
        R: "#FF339D",
        S: "#33FF9D",
        T: "#339DFF",
        U: "#FF9D33",
        V: "#A633FF",
        W: "#33FFA6",
        X: "#FF33A6",
        Y: "#A6FF33",
        Z: "#33FF57"
    };

    const { firstName, lastName } = user
    return (
        <div style={{ backgroundColor: alphabetColors[firstName[0]?.toUpperCase()] }} className="w-32 h-32 rounded-full text-4xl font-extrabold flex justify-center items-center  border-2 border-gray-300">
            {firstName[0]?.toUpperCase() + " " + lastName[0]?.toUpperCase()}
        </div>
    )
}
export default ProfileImage