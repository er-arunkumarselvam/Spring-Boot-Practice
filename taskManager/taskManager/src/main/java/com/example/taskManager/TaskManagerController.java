package com.example.taskManager;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class TaskManagerController {

    private final TaskRepo taskRepo;

    public TaskManagerController(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }
    // DTO Record Class
    record TaskDTO(int id, String taskname, String description, String status, LocalDate date){}

    @GetMapping("/get-task")
    public List<TaskManager> getTask(){
        return taskRepo.findAll();
    }
    @PostMapping("/add-task")
    public String addTask(@RequestBody TaskDTO taskDTO){

        // Emtity Object
        TaskManager taskList = new TaskManager();
        taskList.setTaskname(taskDTO.taskname);
        taskList.setDescription(taskDTO.description);
        taskList.setStatus(taskDTO.status);
        taskList.setDate(taskDTO.date);

        taskRepo.save(taskList);
        return "Task Created";

    }
    @PutMapping("/update-task")
    public String updateTask(@RequestBody TaskDTO taskDTO){

        // Dto Object id find
        TaskManager taskListData = taskRepo.findById(taskDTO.id).orElseThrow(()->new RuntimeException("No Date Found"));
        taskListData.setTaskname(taskDTO.taskname);
        taskListData.setDescription(taskDTO.description);
        taskListData.setStatus(taskDTO.status);
        taskListData.setDate(taskDTO.date);
        taskRepo.save(taskListData);
        return "Task Updated";

    }
    @DeleteMapping("/delete-task")
    public String deleteTask(@RequestBody TaskDTO taskDTO){
        TaskManager taskDelete = taskRepo.findById(taskDTO.id).orElseThrow(()->new RuntimeException("No Data Found"));
        taskRepo.delete(taskDelete);
        return "Task Deleted";
    }
}
