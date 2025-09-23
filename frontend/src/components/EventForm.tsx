import { useState, useEffect } from "react";
import axios from "axios";
import type { PostData } from "../types/posts";
import Post from "./Post";
import "../styles/event-form.css"

const baseUrl = "";

const form = () => (
  <div className="main-container">
    <form className="form-container" onSubmit={addThread}>
      Title: <input
        type="text"
        value={newEventTitle}
        placeholder="Type the title"
        onChange={handleEventTitleChange}
      />
      Organizer: <input
        type="text"
        value={newEventOrganizer}
        placeholder="Type the organizer's name"
        onChange={handleEventOrganizerChange}
      />
      Email: <input
        type="text"
        value={newEventEmail}
        placeholder="Type the organizer's email"
        onChange={handleEventEmailChange}
        />
      Description: <input
        type="text"
        value={newEventDescription}
        placeholder="Type the description"
        onChange={handleEventDescriptionChange}
        />
      Sport: <input
        type="text"
        value={newEventSport}
        placeholder="Type the event sport"
        onChange={handleEventSportChange}
        />
      Location: <input
        type="text"
        value={newEventLocation}
        placeholder="Type the event location"
        onChange={handleEventLocationChange}
        />
      Minimum Bet: <input
        type="number"
        value={newEventMinimumBet}
        placeholder="Type the minimum bet"
        onChange={handleEventMinimumBetChange}
        />


      <button type="submit">Publish thread</button>
    </form>
  </div>
)

const starButton = (e_id: number) => <><button onClick={() => addStar(e_id)</>
}