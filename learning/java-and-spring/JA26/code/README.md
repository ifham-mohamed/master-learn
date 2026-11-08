<!-- Managed by export_warehouse_plan.py -->

# JA26 — Build and run

Reproduce contention for the last unit. Choose row locking or an atomic conditional update and keep lock ordering consistent.

Work in `projects/warehouse-dispatch/` for a shared feature. Use this task folder for isolated experiments. For design, review, and interview tasks, save the artifact in Notes or Results.

Record the working directory, tool version, command or scenario, and test input. Keep your own code and checks here or in the shared project.

## Check your work

Two concurrent requests yield one success, one conflict, and a valid stock balance.

[Practice brief](../notes/00-warehouse-practice.md) · [Results](../results/evidence.md)
