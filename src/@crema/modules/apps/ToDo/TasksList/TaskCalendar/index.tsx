import React, { useState } from "react";
import { momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
// import AddNewTask from "../../AddNewTask";
import { StyledCalendar } from "./Calendar.style";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
// import './calendar.css';
import AppTooltip from "@crema/components/AppTooltip";
import CustomToolbar from "./CustomToolbar";
import { TodoType } from "@crema/types/models/apps/Todo";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const DragAndDropCalendar = withDragAndDrop(StyledCalendar as any);
const localizer = momentLocalizer(moment);

type Props = {
  taskList: TodoType[];
};

const TaskCalender = ({ taskList }: Props) => {
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const router = useRouter();
  const { query } = router;
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const { all } = query;

  let folder: string;
  let label: string;
  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }

  const onSelectDate = (info: SlotInfo) => {
    setSelectedDate(String(info.start));
    setAddTaskOpen(true);
  };

  const onViewTaskDetail = (task: TodoType) => {
    if (folder) router.push(`/apps/todo/${folder}/${task.id}`);
    if (label) router.push(`/apps/todo/label/${label}/${task.id}`);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };
  const getEvents = () => {
    if (taskList?.length > 0)
      return taskList.map((task) => {
        return {
          ...task,
          title: task.title,
          start: new Date(task.startDate),
          end: new Date(task.startDate),
          allDay: true,
        };
      });
    return [];
  };
  return (
    <>
      <DragAndDropCalendar
        localizer={localizer}
        events={getEvents()}
        views={["month", "agenda"]}
        // tooltipAccessor={null}
        showMultiDayTimes
        selectable
        onSelectEvent={(e) => onViewTaskDetail(e as TodoType)}
        components={{
          toolbar: CustomToolbar,
          event: (item: any) => (
            <AppTooltip title={item.title}>
              <Box
                sx={{
                  backgroundColor: item?.event?.priority?.color,
                  borderRadius: 10,
                  px: 2.5,
                  py: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </Box>
            </AppTooltip>
          ),
        }}
        popup
        onSelectSlot={onSelectDate}
        defaultView="month"
      />
    </>
  );
};
export default TaskCalender;
