import { memo, useCallback } from "react";
import { CellContext } from "@tanstack/react-table";
import { StyledActionButtons } from "./react-table/style";
import { Person, TableMeta } from "./react-table/types";

export const TableActionButtons = (props: CellContext<Person, unknown> & { onSave(): void, onCancel(): void, onEdit(index: number): void, allowRowSelection?: boolean }) => {
    const { row: { index, getToggleSelectedHandler, getIsSelected }, table: { options: { meta } }, onCancel, onEdit, onSave, allowRowSelection = false } = props;

    const allowEdit = (meta as TableMeta)?.editIndex === index;
    const _onSave = () => {
        onSave();

    };
    const _onCancel = () => {
        onCancel();
    }
    const _onEdit = () => {
        onEdit(index);
    }


    return (<>{
        allowEdit ?

            <div>
                <StyledActionButtons onClick={_onSave}>save</StyledActionButtons>
                <StyledActionButtons onClick={_onCancel}>cancel</StyledActionButtons>
            </div> :
            <div>
                <StyledActionButtons onClick={_onEdit}>edit</StyledActionButtons>
                {allowRowSelection && <StyledActionButtons onClick={getToggleSelectedHandler()}>{getIsSelected() ? 'Hide Items' : 'Show Items'}</StyledActionButtons>}
            </div>
    }</>)

}

export const ItemsTableAdd = memo((props: CellContext<any, unknown> & { onClick(BillId: string): void, billId: string }) => {
    const { onClick, billId } = props;

    const _onClick = useCallback(() => {
        onClick(billId);
    }, [billId, onClick]);

    return <StyledActionButtons onClick={_onClick}>Add</StyledActionButtons>;
});