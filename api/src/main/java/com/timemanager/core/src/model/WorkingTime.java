package com.timemanager.core.src.model;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "timemanager_workingtimes")
public class WorkingTime {

    @Id
    private String id;

    @Indexed(unique = true)
    private String workingTimeID;

    @NotNull(message = "Start must not be null")
    private long start;

    @NotNull(message = "End must not be null")
    private long end;

    @NotNull(message = "UserId must not be null")
    private String userId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWorkingTimeID() {
        return workingTimeID;
    }

    public void setWorkingTimeID(String workingTimeID) {
        this.workingTimeID = workingTimeID;
    }

    public long getStart() {
        return start;
    }

    public void setStart(long start) {
        this.start = start;
    }

    public long getEnd() {
        return end;
    }

    public void setEnd(long end) {
        this.end = end;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}