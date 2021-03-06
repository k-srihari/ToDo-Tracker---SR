import { Component, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import { DummyTasks } from '../models/dummy-data';
import { TaskReminderService } from '../services/taskreminder.service';
import { ToastrService } from 'ngx-toastr';
import { TaskArchiveService } from '../services/taskarchive.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  currentUserID!: number

  tasksToDisplay!: Task[]

  overDueCount:number = 0
  nearDueCount:number = 0

  nearDueMessage: string = 'You have no tasks pending in Near Due!'
  overDueMessage: string = 'You have no tasks pending in Over Due!'

  constructor(private reminderService: TaskReminderService, private archiveService: TaskArchiveService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
    let userID:string|null = localStorage.getItem('currentUserID')
    this.currentUserID = parseInt(userID == null ? '' : userID)

    this.getOverDue()
    this.getNearDue()
    
      this.nearDueMessage = `You have got ${this.nearDueCount} messages in Near Due!`
      setTimeout(() => this.showNearDueToast(this.nearDueCount), 2000)
   
      this.overDueMessage = `You have got ${this.overDueCount} messages in Over Due!`
      setTimeout(() => this.showOverDueToast(this.overDueCount), 3000)

      this.getAllTasks()
  }

  getAllTasks() {
    this.reminderService.getAllTasks(this.currentUserID).subscribe((res) => this.tasksToDisplay = res)
    // this.tasksToDisplay = DummyTasks
  }

  getPending() {
    this.reminderService.getPending(this.currentUserID).subscribe((res) => this.tasksToDisplay = res)
    // this.tasksToDisplay = [DummyTasks[0], DummyTasks[1], DummyTasks[3], DummyTasks[5], DummyTasks[6], DummyTasks[7], DummyTasks[8]]
  }

  getCompleted() {
    this.reminderService.getCompleted(this.currentUserID).subscribe((res) => {this.tasksToDisplay = res
    console.log(this.tasksToDisplay)})
    // this.tasksToDisplay = [DummyTasks[2], DummyTasks[4]]
  }

  getHighPriority() {
    this.reminderService.getHighPriorityTasks(this.currentUserID).subscribe((res) => this.tasksToDisplay = res)
    // this.tasksToDisplay = [DummyTasks[0], DummyTasks[7]]
  }

  getNearDue() {
    this.reminderService.getNearDueTasks(this.currentUserID).subscribe((res) => {this.tasksToDisplay = res
  this.nearDueCount = res.length})
    // this.tasksToDisplay = [DummyTasks[2], DummyTasks[7]]
  }

  getOverDue() {
    this.reminderService.getOverDueTasks(this.currentUserID).subscribe((res) => {this.tasksToDisplay = res
    this.overDueCount = res.length})
    // this.tasksToDisplay = [DummyTasks[5]]
  }

  getArchived() {
    this.archiveService.getAllArchivedTasks(this.currentUserID).subscribe((res) => this.tasksToDisplay = res)
    // this.tasksToDisplay = [DummyTasks[4], DummyTasks[8]]
  }


  showOverDueToast(count: number) {
    this.toastr.warning('Over Due', `You've ${count} tasks in overdue!`, {
      timeOut: 22000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  }

  showNearDueToast(count: number) {
    this.toastr.info('Near Due', `You've ${count} tasks in neardue!`, {
      timeOut: 18000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  }
}
