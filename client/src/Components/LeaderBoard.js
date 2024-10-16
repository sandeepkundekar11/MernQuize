import { memo, useState } from "react";

const players = [
    {
        rank: 1,
        name: "John Doe",
        score: 1000,
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        rank: 2,
        name: "Jane Smith",
        score: 950,
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        rank: 3,
        name: "Bob Johnson",
        score: 900,
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        rank: 4,
        name: "Alice Brown",
        score: 850,
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        rank: 5,
        name: "Charlie Davis",
        score: 800,
        avatar: "/placeholder.svg?height=40&width=40",
    },
];

const Leaderboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="md:w-11/12 w-full mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Qize Leaderboard
                </h1>

                <div className="mb-6 relative z-20">
                    <input
                        type="text"
                        placeholder="Search players by name"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rank
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Player
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Score
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {players
                                .filter((names) => {
                                    return names.name
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase());
                                })
                                .map((player) => (
                                    <tr key={player.rank} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900">
                                                {player.rank}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={player.avatar}
                                                    alt=""
                                                />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {player.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900">
                                                {player.score}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default memo(Leaderboard);
