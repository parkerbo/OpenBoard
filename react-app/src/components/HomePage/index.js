import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Priorities from "../Priorities";
import { saveNotepad, getNotepad } from "../../store/session";
import { MdLock } from "react-icons/md";

const HomePage = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [content, setContent] = useState("");
	const didMount = useRef(false);
	const [saveState, setSaveState] = useState("");

	const currentDate = new Date();
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const weekDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const currentDay = weekDays[currentDate.getDay()];
	const currentMonth = months[currentDate.getMonth()];
	const currentNumberDay = currentDate.getDate();

	const updateContent = (e) => {
		setSaveState("Saving...");
		setContent(e.target.value);
	};
	useEffect(async () => {
		const newNotepad = await dispatch(getNotepad());
		setContent(newNotepad.content);
	}, []);

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (didMount.current) {
				const payload = {
					userId: user.id,
					notepad: content,
				};
				console.log("here");

				await dispatch(saveNotepad(payload));
				setSaveState("All changes saved");
				setTimeout(() => {
					setSaveState("");
				}, 1000);
			} else {
				didMount.current = true;
			}
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
	}, [content]);
	return (
		<div className="homepage-main">
			<div className="homepage-content">
				<h5 id="homepage-date">{`${currentDay}, ${currentMonth} ${currentNumberDay}`}</h5>
				<h2 id="homepage-greeting">Welcome back, {user.fullname}</h2>
				<div className="homepage-content-widgets">
					<div className="homepage-content-widgets-sort">
						<Priorities />
						<div className="homepage-widget-half">
							<div className="homepage-widget-content">
								<h2 id="homepage-notepad-widget-title">
									Private Notepad
									<MdLock color="#6D6E6F" />
								</h2>
								<div className="homepage-notepad-widget-content">
									<textarea
										placeholder="Type away..."
										required
										value={content}
										onChange={updateContent}
									></textarea>
								</div>
								<div className="homepage-notepad-widget-status">
									{saveState}
								</div>
							</div>
						</div>
						<div className="homepage-widget-full">
							<div className="homepage-widget-content">
								<h2 id="homepage-notepad-widget-title">Projects</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
