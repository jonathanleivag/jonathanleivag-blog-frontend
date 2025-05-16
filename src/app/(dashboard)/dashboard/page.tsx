'use client'
import {FC} from "react";
import CardDashboardComponent from "@/components/dashboard/card.component";
import TableDashboardComponent from "@/components/dashboard/tableDashboard";
import LastUpdateComponent from "@/components/shared/lastUpdate.component";

const DashboardPage: FC = () => {

    return (
        <div className="p-6 space-y-8">
            <LastUpdateComponent><h1 className="text-3xl font-bold text-gray-800">Dashboard</h1></LastUpdateComponent>
           <CardDashboardComponent />
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Actividad Reciente</h2>
                </div>
                <TableDashboardComponent />
            </div>
        </div>
    );
};

export default DashboardPage;
