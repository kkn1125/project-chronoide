import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useSetRecoilState } from "recoil";
import { isNil } from "../../common/features";
import { ChronoFolder, ChronoTask } from "../../models/Chrono";
import { ChronoTree } from "../../models/ChronoTree";
import { chronoTreeState } from "../../recoils/chrono.state";
import dayjs from "dayjs";
import { DateOrTimeView } from "@mui/x-date-pickers";
import { Effect } from "effect";

interface EditorProps {
  chrono: ChronoFolder | ChronoTask;
  // setOpen: Dispatch<SetStateAction<boolean>>;
}

const ChronoEditerForm = ({
  chronoData,
  setChronoData,
}: {
  chronoData: ChronoFolder | ChronoTask;
  setChronoData: Dispatch<SetStateAction<ChronoFolder | ChronoTask>>;
}) => {
  const entries = Object.entries(chronoData);

  const listForm = useCallback(
    (field: keyof ChronoFolder | keyof ChronoTask) => {
      function handleChangeValue(key: string) {
        return function (e) {
          const target = e.target;
          const value = key.match(/^(root|withHoliday)$/)
            ? target.checked
            : target.value;
          setChronoData((chronoData) => {
            return Object.assign(Object.assign({ ...chronoData }), {
              [key]: value,
            });
          });
        };
      }
      switch (field) {
        case "id":
        case "order":
        case "depth":
          return (
            <TextField
              fullWidth
              label={field}
              type="number"
              value={isNil(chronoData[field]) ? 0 : chronoData[field]}
              size="small"
              disabled={!!field.match(/^(id|depth|order)$/)}
              onChange={handleChangeValue(field)}
            />
          );
        case "title":
        case "content":
        case "type":
        case "name":
        case "group":
          return (
            <TextField
              fullWidth
              label={field}
              type="text"
              value={isNil(chronoData[field]) ? "" : chronoData[field]}
              size="small"
              disabled={!!field.match(/^(type)$/)}
              onChange={handleChangeValue(field)}
            />
          );
        case "start_at":
        case "end_at":
          return <></>;
        // case "root":
        case "withHoliday":
          return (
            <FormControlLabel
              labelPlacement="start"
              label={field}
              control={
                <Switch
                  onChange={handleChangeValue(field)}
                  checked={chronoData[field]}
                />
              }
            />
          );
        default:
          return <></>;
      }
    },
    [chronoData, setChronoData],
  );

  return entries.map(([key, value], index) => (
    <ListItem key={key}>
      {listForm(key as keyof ChronoFolder | keyof ChronoTask)}
    </ListItem>
  ));
};

function Editer({ chrono }: EditorProps) {
  const views: DateOrTimeView[] = [
    "year",
    "month",
    "day",
    "hours",
    "minutes",
    "seconds",
  ];
  const [state, setState] = useState(false);
  const [chronoData, setChronoData] = useState<ChronoFolder | ChronoTask>(
    Object.assign({}, chrono),
  );
  const setChronoTree = useSetRecoilState(chronoTreeState);
  const [errorMark, setErrorMark] = useState({
    start_at: false,
    end_at: false,
  });

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      // setOpen(open);

      if (
        event &&
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  function handleChangeTime(field: string) {
    return function (e: dayjs.Dayjs | null) {
      if (!e) return;

      const time = e.toDate().getTime();

      if (field === "end_at" && chronoData["start_at"] > time) {
        // alert("종료일은 시작일 보다 크게 해야합니다.");
        setErrorMark({ ...errorMark, [field]: true });
        return;
      }

      if (field === "start_at" && chronoData["end_at"] < time) {
        // alert("종료일은 시작일 보다 크게 해야합니다.");
        setErrorMark({ ...errorMark, [field]: true });
        return;
      }

      setChronoData((chronoData) => {
        return Object.assign(Object.assign({ ...chronoData }), {
          [field]: time,
        });
      });
      setErrorMark({
        start_at: false,
        end_at: false,
      });
    };
  }

  function handleEditConfirm() {
    Object.assign(chrono, chronoData);
    setChronoTree((chronoTree) => {
      const newChronoTree = new ChronoTree();
      newChronoTree.childrens = [...chronoTree.childrens];
      return newChronoTree;
    });
  }

  return (
    <Box>
      <IconButton
        size="small"
        color="warning"
        onClick={(e) => {
          toggleDrawer(true)(e);
        }}>
        <EditNoteIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}>
        <Box sx={{ width: 450 }} role="presentation">
          <List>
            <ChronoEditerForm
              chronoData={chronoData}
              setChronoData={setChronoData}
            />
            {"start_at" in chronoData && "end_at" in chronoData && (
              <ListItem>
                <DateTimePicker
                  views={views}
                  value={dayjs(new Date(chronoData.start_at))}
                  onChange={handleChangeTime("start_at")}
                  slotProps={{
                    textField: {
                      label: "start_at",
                      size: "small",
                      color: errorMark["start_at"] ? "error" : undefined,
                    },
                  }}
                />
                <Typography sx={{ mx: 1 }}>-</Typography>
                <DateTimePicker
                  views={views}
                  value={dayjs(new Date(chronoData.end_at))}
                  onChange={handleChangeTime("end_at")}
                  slotProps={{
                    textField: {
                      label: "end_at",
                      size: "small",
                      color: errorMark["end_at"] ? "error" : undefined,
                    },
                  }}
                />
              </ListItem>
            )}
            {chrono instanceof ChronoTask && (
              <ListItem>
                <TextField
                  value={chrono.duration}
                  size="small"
                  label="duration"
                />
              </ListItem>
            )}
          </List>
          <Divider />
          <List>
            <ListItem>
              <Button
                size="small"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleEditConfirm}>
                수정
              </Button>
            </ListItem>
            <ListItem>
              <Button size="small" fullWidth variant="contained" color="error">
                삭제
              </Button>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}

export default Editer;
