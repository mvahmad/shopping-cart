import { create } from "zustand";
import { ProductsEntity } from "@/app/types";

interface State{
    id:string;
    name:string;
    items?: ProductsEntity |null
}

interface Action{
    setSelectedItem: (item: State) => void;
    getSelectedItem: () => State;
    clearSelectedItem: () => void;
}

const INITIAL_STATE : State = {
    id: "",
    name: "",
    items: null
}

const useAdminStore = create<State & Action>()(
    (set ,get) =>({
        id: INITIAL_STATE.id,
        name: INITIAL_STATE.name,
        items: INITIAL_STATE.items,
        setSelectedItem: (item: State) => {
            set(() => ({
                id: item.id,
                name: item.name,
                items: item.items
            }))
        },
        getSelectedItem: () => {
            const { id, name, items } = get();
            return {
                id,
                name,
                items
            }
        },
        clearSelectedItem: () => {
            set(() => ({
                id: "",
                name: "",
                items: null
            }))
        }

    })
);
export default useAdminStore;