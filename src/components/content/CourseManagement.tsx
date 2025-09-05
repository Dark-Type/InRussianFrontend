import { useState, useEffect } from "react";
import { axiosInstance } from "../../instances/axiosInstance";
import { useContent } from "../../context/content/UseContent.ts";
import { CreateEditModal } from "./CreateEditModal";
import TaskEditorModal from "./task-editor/TaskEditorModal.tsx";
import { taskTypesToRu } from '../content/task-editor/TaskModels';
import type { TaskModel } from "./task-editor/TaskModels";


// New types for tree structure
export type ThemeTreeNode = {
    theme: any;
    children: ThemeTreeNode[];
};

interface ThemeTreeNodeComponentProps {
    node: ThemeTreeNode;
    expandedThemes: string[];
    onThemeClick: (id: string) => void;
    openModal: (type: "course" | "section" | "theme", parentId?: string | null, editItem?: any, courseId?: string) => void;
    openTaskEditor: (themeId: string, themeName: string, task?: TaskModel | null) => void;
    taskModels: Record<string, TaskModel[]>;
    deleteTaskModel: any;
    themeTaskCounts: {[themeId: string]: number};
    handleDeleteTask: (taskId: string, themeId: string) => void;
    taskRefreshTrigger: number; // Add this to force task list refresh
    handleDeleteTheme: (theme: any) => void; // Add this to handle theme deletion
}

const ThemeTreeNodeComponent = (props: ThemeTreeNodeComponentProps) => {
    const { node, expandedThemes, onThemeClick, openModal, openTaskEditor, taskModels, deleteTaskModel, themeTaskCounts, handleDeleteTask, taskRefreshTrigger, handleDeleteTheme } = props;
    const theme = node.theme;
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedThemes.includes(theme.id);
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    // Get task count from props instead of loading tasks
    const taskCount = themeTaskCounts[theme.id] || 0;

    // Only load tasks for display when expanded (not for counting)
    useEffect(() => {
        if (isExpanded && !hasChildren) {
            console.log(`📋 Loading tasks for display for theme ${theme.name} (${theme.id})`);
            axiosInstance.get(`/content/themes/${theme.id}/tasks`)
                .then(res => {
                    setTasks(res.data);
                })
                .catch(err => {
                    console.error(`Failed to load tasks for theme ${theme.id}:`, err);
                    setTasks([]);
                });
        }
        if (!isExpanded) {
            setTasks([]);
        }
    }, [isExpanded, hasChildren, theme.id, taskRefreshTrigger]); // Add taskRefreshTrigger as dependency

    // Button logic based on your requirements:
    // - Theme with sub-themes: only "Create Sub-theme" button
    // - Theme with tasks (no sub-themes): only "Create Task" button  
    // - Theme with no sub-themes and no tasks: both buttons
    let showCreateTheme = true;
    let showCreateTask = true;
    
    if (hasChildren) {
        // Theme has sub-themes -> only show create sub-theme button
        showCreateTask = false;
    } else if (taskCount > 0) {
        // Theme has tasks -> only show create task button
        showCreateTheme = false;
    }
    // If no children and no tasks -> show both buttons (default)

    // Debug logging
    console.log(`🔍 Theme "${theme.name}" (${theme.id}):`, {
        taskCount,
        hasChildren,
        showCreateTheme,
        showCreateTask,
        themeTaskCountsHasThisId: theme.id in themeTaskCounts
    });

    return (
        <div style={{ marginBottom: "8px", marginLeft: theme.parentThemeId ? 20 : 0 }}>
            <div
                onClick={() => onThemeClick(theme.id)}
                style={{
                    padding: "10px 14px",
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ flex: 1 }}>
                    <strong>{theme.name}</strong>
                    {theme.description && (
                        <p style={{ margin: "2px 0 0 0", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>{theme.description}</p>
                    )}
                    <div style={{ marginTop: "2px", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                        {hasChildren
                            ? `Подтем: ${node.children.length}`
                            : taskCount > 0
                                ? `Задач: ${taskCount}`
                                : "Задач: 0"}
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            openModal("theme", theme.parentThemeId ?? null, theme, theme.courseId);
                        }}
                        style={{ padding: "4px 8px", background: "var(--color-border)", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}
                    >✏️</button>
                    {showCreateTheme && (
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                openModal("theme", theme.id, undefined, theme.courseId);
                            }}
                            style={{ padding: "4px 8px", background: "var(--color-primary)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}
                        >+ Добавить под-тему</button>
                    )}
                    {showCreateTask && (
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                openTaskEditor(theme.id, theme.name);
                            }}
                            style={{ padding: "4px 8px", background: "var(--color-primary)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}
                        >+ Создать задачу</button>
                    )}
                    <button
                        onClick={e => { 
                            e.stopPropagation(); 
                            handleDeleteTheme(theme);
                        }}
                        title="Удалить тему"
                        style={{ padding: "4px 8px", background: "#f44336", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}
                    >🗑️</button>
                    <span>{isExpanded ? "▼" : "▶"}</span>
                </div>
            </div>
            {/* Render children recursively if expanded */}
            {isExpanded && hasChildren && (
                <div style={{ marginLeft: 20 }}>
                    {node.children.map((child: ThemeTreeNode) => (
                        <ThemeTreeNodeComponent
                            key={child.theme.id}
                            node={child}
                            expandedThemes={expandedThemes}
                            onThemeClick={onThemeClick}
                            openModal={openModal}
                            openTaskEditor={openTaskEditor}
                            taskModels={taskModels}
                            deleteTaskModel={deleteTaskModel}
                            themeTaskCounts={themeTaskCounts}
                            handleDeleteTask={handleDeleteTask}
                            taskRefreshTrigger={taskRefreshTrigger}
                            handleDeleteTheme={handleDeleteTheme}
                        />
                    ))}
                </div>
            )}
            {/* Show tasks if expanded and no children */}
            {isExpanded && !hasChildren && tasks.length > 0 && (
                <div style={{ marginTop: "8px", paddingLeft: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <h6 style={{ margin: 0, fontWeight: 600 }}>Задачи (новый редактор)</h6>
                    </div>
                    {tasks.map((task: TaskModel) => (
                        <div key={task.id} style={{ padding: "8px 12px", background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <span>{task.question || "Без вопроса"}</span>
                                <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{taskTypesToRu(task.taskType as any)}</div>
                            </div>
                            <div style={{ display: "flex", gap: "4px" }}>
                                <button
                                    onClick={() => openTaskEditor(theme.id, theme.name, task)}
                                    style={{ padding: "2px 6px", background: "var(--color-border)", border: "none", borderRadius: "2px", cursor: "pointer", fontSize: "0.7rem" }}
                                >✏️</button>
                                <button
                                    onClick={() => handleDeleteTask(task.id, theme.id)}
                                    title="Удалить задачу"
                                    style={{ padding: "2px 6px", background: "#f44336", color: "#fff", border: "none", borderRadius: "2px", cursor: "pointer", fontSize: "0.7rem" }}
                                >🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const CoursesManagement = () => {
    const [courseTaskCounts, setCourseTaskCounts] = useState<{[courseId: string]: number}>({});
    const [themeTaskCounts, setThemeTaskCounts] = useState<{[themeId: string]: number}>({});
    const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(0); // Add trigger for task list refresh

    const {
        courses,
        themeTree,
        isLoadingCourses,
        taskModels,
        deleteTaskModel,
        // add other needed context values
    createCourse,
    updateCourse,
    deleteCourse,
    createTheme,
    updateTheme,
    deleteTheme,
    loadCourses,
    loadThemeTree
    } = useContent();

    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
    const [expandedThemes, setExpandedThemes] = useState<string[]>([]);
    const [modalState, setModalState] = useState<{ isOpen: boolean; type: string | null; editItem: any; parentId?: string | null, courseId?: string | null }>({ isOpen: false, type: null, editItem: null, parentId: null, courseId: null });
    const [taskEditorState, setTaskEditorState] = useState<{ isOpen: boolean; themeId: string | null; themeName: string | null; task: any }>({ isOpen: false, themeId: null, themeName: null, task: null });

    // Load courses on mount
    useEffect(() => {
        loadCourses();
    }, []);

    // Load theme trees for all courses after courses are loaded
    useEffect(() => {
        const loadAllThemeTreesAndCounts = async () => {
            if (courses.length > 0) {
                // Load theme trees for all courses
                for (const course of courses) {
                    try {
                        await loadThemeTree(course.id, "course");
                    } catch (error) {
                        console.error(`Error loading theme tree for course ${course.id}:`, error);
                    }
                }
            }
        };

        loadAllThemeTreesAndCounts();
    }, [courses]);

    // Load task counts after courses are loaded
    useEffect(() => {
        (async () => {
            if (courses.length > 0) {
                const counts: {[courseId: string]: number} = {};
                await Promise.all(courses.map(async (course) => {
                    try {
                        const resp = await axiosInstance.get(`/content/stats/course/${course.id}/tasks-count`);
                        // Sum all values in the returned map
                        const total = Object.values(resp.data as Record<string, number>).reduce((acc: number, val) => acc + (typeof val === "number" ? val : 0), 0);
                        counts[course.id] = total;
                    } catch {
                        counts[course.id] = 0;
                    }
                }));
                setCourseTaskCounts(counts);
            }
        })();
    }, [courses]);

    // Load theme tree when a course is expanded
    useEffect(() => {
        if (expandedCourse) {
            loadThemeTree(expandedCourse, "course");
        }
    }, [expandedCourse]); // Remove loadThemeTree from dependencies to prevent infinite loop

    // Modal handlers
    // Refactored openModal to always set courseId and parentId correctly for theme creation/edit
    const openModal = (type: string, parentId?: string | null, editItem?: any, courseId?: string) => {
        setModalState({ isOpen: true, type, editItem, parentId: parentId ?? null, courseId: courseId ?? null });
    };
    const closeModal = () => {
        setModalState({ isOpen: false, type: null, editItem: null, parentId: null, courseId: null });
    };
    const handleModalSave = async (data: { name: string; description?: string; position?: number }) => {
        if (modalState.type === "course") {
            // Use correct argument signature for updateCourse and createCourse
            if (modalState.editItem) {
                await updateCourse(
                    modalState.editItem.id,
                    data.name,
                    data.description
                );
            } else {
                await createCourse(
                    data.name,
                    data.description
                );
            }
            await loadCourses();
            // Reload course task counts after course operations
            const counts: {[courseId: string]: number} = {};
            await Promise.all(courses.map(async (course) => {
                try {
                    const resp = await axiosInstance.get(`/content/stats/course/${course.id}/tasks-count`);
                    const total = Object.values(resp.data as Record<string, number>).reduce((acc: number, val) => acc + (typeof val === "number" ? val : 0), 0);
                    counts[course.id] = total;
                } catch {
                    counts[course.id] = 0;
                }
            }));
            setCourseTaskCounts(counts);
        } else if (modalState.type === "theme") {
            if (modalState.editItem) {
                await updateTheme(
                    modalState.editItem.id,
                    data.name,
                    data.description
                );
                // Refresh task count for updated theme
                await refreshThemeTaskCount(modalState.editItem.id);
                // Reload theme tree for the course to show changes
                if (modalState.courseId || modalState.editItem.courseId) {
                    await loadThemeTree(modalState.courseId || modalState.editItem.courseId, "course");
                }
            } else {
                // Strict theme creation logic:
                // Top-level theme: parentThemeId = null, courseId set
                // Sub-theme: parentThemeId set, courseId set
                const newTheme = await createTheme({
                    courseId: modalState.courseId || "",
                    parentThemeId: modalState.parentId ?? null,
                    name: data.name,
                    description: data.description,
                    position: data.position ?? null
                });
                // Refresh task count for new theme (will be 0 initially)
                if (newTheme?.id) {
                    await refreshThemeTaskCount(newTheme.id);
                }
                // Reload theme tree for the course to show the new theme
                if (modalState.courseId) {
                    await loadThemeTree(modalState.courseId, "course");
                }
            }
        }
        closeModal();
    };
    const handleDelete = async (type: string, item: any) => {
        if (type === "course") {
            await deleteCourse(item.id);
            await loadCourses();
            // Reload course task counts after deletion
            const counts: {[courseId: string]: number} = {};
            await Promise.all(courses.map(async (course) => {
                try {
                    const resp = await axiosInstance.get(`/content/stats/course/${course.id}/tasks-count`);
                    const total = Object.values(resp.data as Record<string, number>).reduce((acc: number, val) => acc + (typeof val === "number" ? val : 0), 0);
                    counts[course.id] = total;
                } catch {
                    counts[course.id] = 0;
                }
            }));
            setCourseTaskCounts(counts);
        } else if (type === "theme") {
            await deleteTheme(item.id);
            // Reload theme tree for the course after theme deletion
            if (item.courseId) {
                await loadThemeTree(item.courseId, "course");
            }
            // Remove from task counts
            setThemeTaskCounts(prev => {
                const newCounts = { ...prev };
                delete newCounts[item.id];
                return newCounts;
            });
        }
        closeModal();
    };
    const getModalTitle = () => {
        if (modalState.type === "course") return modalState.editItem ? "Редактировать курс" : "Создать курс";
        if (modalState.type === "theme") return modalState.editItem ? "Редактировать тему" : "Создать тему";
        return "";
    };
    const getDeleteWarning = (type: string, item: any) => {
        if (type === "course") return `Удалить курс "${item.name}"? Все темы и задачи будут удалены.`;
        if (type === "theme") return `Удалить тему "${item.name}"? Все задачи будут удалены.`;
        return "";
    };
    const handleCourseClick = (id: string) => setExpandedCourse(expandedCourse === id ? null : id);
    const handleThemeClick = (id: string) => {
        setExpandedThemes(prev =>
            prev.includes(id)
                ? prev.filter(tid => tid !== id)
                : [...prev, id]
        );
    };
    const openTaskEditor = (themeId: string, themeName: string, task?: any) => setTaskEditorState({ isOpen: true, themeId, themeName, task });
    const closeTaskEditor = () => setTaskEditorState({ isOpen: false, themeId: null, themeName: null, task: null });
    const loadTaskModels = (_themeId: string) => {};

    // Fetch task counts for all themes whenever theme tree changes
    useEffect(() => {
        const fetchTaskCounts = async () => {
            const allThemeIds: string[] = [];
            
            // Helper function to recursively collect all theme IDs
            const collectThemeIds = (nodes: any[]): string[] => {
                const ids: string[] = [];
                for (const node of nodes) {
                    ids.push(node.theme.id);
                    if (node.children && node.children.length > 0) {
                        ids.push(...collectThemeIds(node.children));
                    }
                }
                return ids;
            };

            // Collect all theme IDs from all theme trees
            Object.values(themeTree).forEach(treeNodes => {
                if (treeNodes && Array.isArray(treeNodes)) {
                    allThemeIds.push(...collectThemeIds(treeNodes));
                }
            });

            console.log('Fetching task counts for themes:', allThemeIds);

            if (allThemeIds.length > 0) {
                const counts: {[themeId: string]: number} = {};
                
                // Fetch task count for each theme using the correct endpoint
                for (const themeId of allThemeIds) {
                    try {
                        const response = await axiosInstance.get(`/content/stats/theme/${themeId}/tasks-count`);
                        // The response is a Map_String, so we need to sum the values
                        const taskCountMap = response.data as Record<string, number>;
                        const totalTasks = Object.values(taskCountMap).reduce((sum, count) => sum + (typeof count === 'number' ? count : 0), 0);
                        counts[themeId] = totalTasks;
                        console.log(`Theme ${themeId}: ${totalTasks} tasks`);
                    } catch (error) {
                        counts[themeId] = 0;
                        console.error(`Error getting task count for theme ${themeId}:`, error);
                    }
                }
                
                console.log('Setting theme task counts:', counts);
                setThemeTaskCounts(counts);
            }
        };

        // Only fetch if we have theme trees
        if (Object.keys(themeTree).length > 0) {
            fetchTaskCounts();
        }
    }, [themeTree]); // Removed getTasksCountByTheme to prevent infinite loops

    // Function to refresh task count for a specific theme
    const refreshThemeTaskCount = async (themeId: string) => {
        try {
            const response = await axiosInstance.get(`/content/stats/theme/${themeId}/tasks-count`);
            // The response is a Map_String, so we need to sum the values
            const taskCountMap = response.data as Record<string, number>;
            const totalTasks = Object.values(taskCountMap).reduce((sum, count) => sum + (typeof count === 'number' ? count : 0), 0);
            setThemeTaskCounts(prev => ({ ...prev, [themeId]: totalTasks }));
            console.log(`Refreshed task count for theme ${themeId}: ${totalTasks} tasks`);
        } catch (error) {
            setThemeTaskCounts(prev => ({ ...prev, [themeId]: 0 }));
            console.error(`Error refreshing task count for theme ${themeId}:`, error);
        }
    };

    // Wrapper for deleteTaskModel that also refreshes task count
    const handleDeleteTask = async (taskId: string, themeId: string) => {
        if (deleteTaskModel) {
            await deleteTaskModel(taskId, themeId);
            await refreshThemeTaskCount(themeId);
            
            // Trigger refresh of task lists by incrementing the refresh trigger
            setTaskRefreshTrigger(prev => prev + 1);
        }
    };

    // Handle theme deletion
    const handleDeleteTheme = async (theme: any) => {
        await handleDelete("theme", theme);
    };

    // Helper function to count all themes recursively in a course
    const getTotalThemeCount = (courseId: string): number => {
        if (!themeTree[courseId]) return 0;
        
        const countThemes = (nodes: ThemeTreeNode[]): number => {
            let count = 0;
            for (const node of nodes) {
                count += 1; // Count this theme
                if (node.children && node.children.length > 0) {
                    count += countThemes(node.children); // Count children recursively
                }
            }
            return count;
        };
        
        return countThemes(themeTree[courseId]);
    };

    return (
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px",
                    }}
                >
                    <h2 style={{margin: 0, fontWeight: 700, fontSize: "1.5rem"}}>
                        Управление курсами
                    </h2>
                    <button
                        onClick={() => openModal("course")}
                        style={{
                            padding: "10px 20px",
                            background: "var(--color-primary)",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: 500,
                        }}
                    >
                        + Создать курс
                    </button>
                </div>

                <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
                    {isLoadingCourses ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600">Загрузка курсов...</span>
                        </div>
                    ) : courses.length === 0 ? (
                        <div
                            style={{
                                border: "1px solid var(--color-border)",
                                borderRadius: "8px",
                                background: "var(--color-card)",
                                padding: "16px 20px",
                                color: "var(--color-text-secondary)",
                            }}
                        >
                            Курсы не найдены
                        </div>
                    ) : (
                        <>
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    style={{
                                        border: "1px solid var(--color-border)",
                                        borderRadius: "8px",
                                        background: "var(--color-card)",
                                        overflow: "hidden",
                                    }}
                                >
                                    {/* Course Header */}
                                    <div
                                        onClick={() => handleCourseClick(course.id)}
                                        style={{
                                            padding: "16px 20px",
                                            cursor: "pointer",
                                            borderBottom:
                                                expandedCourse === course.id
                                                    ? "1px solid var(--color-border)"
                                                    : "none",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            background:
                                                expandedCourse === course.id
                                                    ? "var(--color-bg)"
                                                    : "transparent",
                                        }}
                                    >
                                        <div style={{flex: 1}}>
                                            <h3 style={{margin: "0 0 4px 0", fontWeight: 600}}>
                                                {course.name}
                                            </h3>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    color: "var(--color-text-secondary)",
                                                    fontSize: "0.95rem",
                                                }}
                                            >
                                                {course.description}
                                            </p>
                                            <div
                                                style={{
                                                    marginTop: "8px",
                                                    fontSize: "0.9rem",
                                                    color: "var(--color-text-secondary)",
                                                }}
                                            >
                                                Тем: {getTotalThemeCount(course.id)} | Задач: {courseTaskCounts[course.id] ?? 0}
                                            </div>
                                        </div>
                                        <div
                                            style={{display: "flex", alignItems: "center", gap: "8px"}}
                                        >
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal("course", undefined, course);
                                                }}
                                                style={{
                                                    padding: "4px 8px",
                                                    background: "var(--color-border)",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    fontSize: "0.8rem",
                                                }}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete("course", course); }}
                                                title="Удалить курс"
                                                style={{
                                                    padding: "4px 8px",
                                                    background: "#f44336",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    fontSize: "0.8rem",
                                                }}
                                            >🗑️</button>
                                            <span style={{fontSize: "1.2rem"}}>
                                                {expandedCourse === course.id ? "▼" : "▶"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Theme Tree (no sections) */}
                                    {expandedCourse === course.id && (
                                        <div style={{padding: "0 20px 16px 40px"}}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    marginBottom: "12px",
                                                }}
                                            >
                                                <h4 style={{margin: 0, fontWeight: 600}}>Темы</h4>
                                                <button
                                                    onClick={() => openModal("theme", null, undefined, course.id)}
                                                    style={{
                                                        padding: "6px 12px",
                                                        background: "var(--color-primary)",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                        cursor: "pointer",
                                                        fontSize: "0.9rem",
                                                    }}
                                                >
                                                    + Добавить тему
                                                </button>
                                            </div>

                                            {/* Recursive theme tree rendering */}
                                            {themeTree[course.id]?.map((node: ThemeTreeNode) => (
                                                <ThemeTreeNodeComponent
                                                    key={node.theme.id}
                                                    node={node}
                                                    expandedThemes={expandedThemes}
                                                    onThemeClick={handleThemeClick}
                                                    openModal={openModal}
                                                    openTaskEditor={openTaskEditor}
                                                    taskModels={taskModels}
                                                    deleteTaskModel={deleteTaskModel}
                                                    themeTaskCounts={themeTaskCounts}
                                                    handleDeleteTask={handleDeleteTask}
                                                    taskRefreshTrigger={taskRefreshTrigger}
                                                    handleDeleteTheme={handleDeleteTheme}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <CreateEditModal
                    isOpen={modalState.isOpen}
                    onClose={closeModal}
                    onSave={handleModalSave}
                    onDelete={
                        modalState.editItem && modalState.type
                            ? () => handleDelete(modalState.type as string, modalState.editItem)
                            : undefined
                    }
                    title={getModalTitle()}
                    initialName={modalState.editItem?.name || ""}
                    initialDescription={modalState.editItem?.description || ""}
                    isEdit={!!modalState.editItem}
                    deleteWarning={
                        modalState.editItem && modalState.type
                            ? getDeleteWarning(modalState.type as string, modalState.editItem)
                            : undefined
                    }
                    type={modalState.type as "course" | "theme" | undefined}
                    initialAuthorUrl={modalState.editItem?.authorUrl || ""}
                    initialLanguage={modalState.editItem?.language || ""}
                    initialCoursePosterId={modalState.editItem?.posterId || null}
                    initialIsPublished={modalState.editItem?.isPublished || false}
                />

                <TaskEditorModal
                    isOpen={taskEditorState.isOpen}
                    onClose={() => {
                        closeTaskEditor();
                        if (taskEditorState.themeId) {
                            // Обновляем список после закрытия
                            loadTaskModels(taskEditorState.themeId);
                            refreshThemeTaskCount(taskEditorState.themeId);
                        }
                    }}
                    themeId={taskEditorState.themeId!}
                    initialTask={taskEditorState.task || undefined}
                    onCreated={() => {
                        if (taskEditorState.themeId) {
                            loadTaskModels(taskEditorState.themeId);
                            refreshThemeTaskCount(taskEditorState.themeId);
                        }
                    }}
                    onUpdated={() => {
                        if (taskEditorState.themeId) {
                            loadTaskModels(taskEditorState.themeId);
                            refreshThemeTaskCount(taskEditorState.themeId);
                        }
                    }}
                />
            </div>
    );
};