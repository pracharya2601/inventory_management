import Button from "@/components/elements/Button";
import DropDownMenu, { DropDownItem } from "@/components/elements/ddm/DropDownMenu";
import Input from "@/components/elements/Input";
import { CreateStaffFormType } from "@/interface/Workplace/Company";
import { ChangeEvent } from "react";

interface CreateStaffProps {
  staffs: CreateStaffFormType[] | [];
  onHandleChange: (e: ChangeEvent) => void;
  onDropDownChange: (name: string, value: string) => void;
  addMore: () => void;
  remove: (name: string) => void;

}

const CreateStaffForm = ({ staffs, onHandleChange, onDropDownChange, addMore, remove }: CreateStaffProps) => (
  <>
    {staffs?.map(({ fullName, email, positionLabel }, index) => (
      <div
        key={`staffs-${index}-createstaffform`}
        className={`border-2 ${!positionLabel && 'border-red-500'}  mt-2 p-2 rounded`}
      >
        <div className="py-1 flex justify-between align-center mb-2 pr-1">
          <div className="text-lg">Staff - 1</div>
          <DropDownMenu label={positionLabel || 'Position'} dropSide="left">
            <DropDownItem
              label="Staff"
              onClick={() => onDropDownChange(`staffs.${index}.positionLabel`, 'staff')}
            />
            <DropDownItem
              label="Admin"
              onClick={() => onDropDownChange(`staffs.${index}.positionLabel`, 'admin')}
            />
          </DropDownMenu>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            square
            helper="Name"
            value={fullName}
            type="text"
            placeholder={`Staff-${index + 1} Name`}
            name={`staffs.${index}.fullName`}
            onChange={onHandleChange}
          />
          <Input
            square
            helper="Email"
            type="email"
            value={email}
            placeholder={`Staff-${index + 1} Email`}
            name={`staffs.${index}.email`}
            onChange={onHandleChange}
          />
          <div>
            <p className="text-yellow-500 text-xs mt-1">
              &#x26A0; Employee Name may be updated during verification.
            </p>
            <p className="text-yellow-500 text-xs mb-2">
              &#x26A0; Employee mush have account with same email.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            label="Delele"
            type="button"
            size="xs"
            color="red"
            onClick={() => remove(`staffs.${index}`)}
            customClass=""
          />
        </div>
      </div>
    ))}
    <Button
      label={staffs?.length > 0 ? 'Add More Employee' : 'Employee Form'}
      size={staffs?.length > 0 ? 'xs' : 'sm'}
      type="button"
      color={staffs?.length > 0 ? 'gray' : 'blue'}
      onClick={() => addMore()}
      customClass="mt-2"
    />
  </>
)

export default CreateStaffForm;