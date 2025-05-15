<template>
  <div class="w-full flex justify-between">
    <div
      class="min-h-screen flex flex-col items-center"
      style="width: calc(100% - 320px)"
    >
      <div
        v-if="!isFinishedCourse"
        class="w-full max-w-[860px] h-full p-12 pt-24"
      >
        <div class="flex items-center mb-2">
          <BackButton :backFunction="goToCourseInfo" :text="currentTopic?.name"/>
        </div>
        <p class="text-sm text-gray-500 mb-10 ml-2">
          {{ course?.name }}: {{ currentClassName }}
        </p>
        <div class="mb-10" style="min-height: calc(100vh - 482px)">
          <div v-for="content in currentTopicContent" class="mb-6">
            <p v-if="content.type === 'text'" class="text-justify">
              {{ content.value }}
            </p>
            <img
              v-if="content.type === 'image'"
              :src="content.value"
              class="mx-auto"
            />
          </div>
        </div>

        <div class="flex items-center mb-8">
          <Button @click="goToNextTopic" class="mr-6"
            >Ir para o próximo item</Button
          >
          <div v-if="isTopicCompleted" class="flex items-center">
            <i class="pi pi-check mr-2"></i>
            <p class="font-bold">Concluído</p>
          </div>
        </div>

        <div class="h-px w-full bg-gray-200 mb-6"></div>
        <Dialog>
          <DialogTrigger as-child>
            <div @click="" class="flex items-center cursor-pointer">
              <i class="pi pi-flag mr-2"></i>
              <p class="font-semibold text-sm">Reportar problema</p>
            </div>
          </DialogTrigger>
          <DialogContent class="sm:max-w-md">
            <DialogHeader class="mb-3">
              <DialogTitle class="mb-1">Algum problema com o conteúdo?</DialogTitle>
              <DialogDescription>
                Envie um e-mail para <a href="mailto:brunapf@dcc.ufrj.br" class="underline">brunapf@dcc.ufrj.br</a> reportando o erro.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter >
              <DialogClose as-child>
                <Button type="button" variant="secondary" class="font-semibold" v-slot="{ close }" @click="close">Fechar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div v-else class="w-full max-w-[860px] h-full p-12 pt-24 flex flex-col items-center justify-center">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="pi pi-check-circle text-2xl text-green-500"></i>
          </div>
          <h1 class="text-3xl font-black text-gray-800 mb-2">Parabéns!</h1>
          <p class="text-xl text-gray-800 mb-2">Você concluiu o curso {{ course?.name }}</p>
        </div>
        
        <div class="bg-white rounded-xl border border-black p-8 w-full max-w-md mb-8">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Resumo do Curso</h2>
          <div class="space-y-3">
            <div class="flex items-center">
              <i class="pi pi-book text-gray-500 mr-3"></i>
              <span class="text-gray-600">{{ classes.length }} módulos completados</span>
            </div>
            <div class="flex items-center">
              <i class="pi pi-list text-gray-500 mr-3"></i>
              <span class="text-gray-600">{{ totalTopics }} tópicos estudados</span>
            </div>
          </div>
        </div>

        <Button @click="goToHome" class="flex items-center">
          <i class="pi pi-home mr-1"></i>
          Voltar à home
        </Button>
      </div>
    </div>
    <Sidebar :classes="classesSkeleton" />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, computed, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import Sidebar from "@components/ui/Sidebar.vue";
  import BackButton from "@/components/ui/BackButton.vue";
  import Button from "@components/ui/button/Button.vue";
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
  import { Course, Class, Topic, TopicContent } from "@/database/types";

  const router = useRouter();
  const route = useRoute();

  const course = ref<Course | undefined>();
  const classes = ref<Class[]>([]);
  const classesSkeleton = ref<{ id: string; name: string; topics: { id: string; name: string }[] }[]>([]);
  const topicsFromClass = ref<Topic[]>([]);
  const currentTopic = ref<Topic | undefined>();
  const currentTopicContent = ref<TopicContent[]>([]);
  const currentClassName = ref<string>('');
  const isFinishedCourse = ref(false);
  const isTopicCompleted = ref(false);

  const totalTopics = computed(() => {
    return classes.value.reduce((acc, curr) => acc + topicsFromClass.value.length, 0);
  });

  const isCourseCompleted = (completedContent: Record<string, { topicId: string; completed: boolean }[]>) => {
    // Check if all classes exist in completedContent
    const allClassesExist = classes.value.every((classItem) => 
      completedContent[classItem.id] !== undefined
    );
    
    if (!allClassesExist) return false;

    // Check if all topics in each class are completed
    return Object.values(completedContent).every((topics) =>
      topics.every((topic) => topic.completed)
    );
  };

  const updateTopicStatus = async () => {
    const { courseId, classId, topicId } = route.params;
    const progress = await window.store.get("progress");
    const completedContent = progress?.[courseId]?.completedContent || {};
    const topics = completedContent[classId];

    if (!topics) return;
    const topic = topics[topicId - 1];
    isTopicCompleted.value = topic ? topic.completed : false;
  };

  const getFirstIncomplete = (completedContent: Record<string, { topicId: string; completed: boolean }[]>) => {
    const sortedClassIds = Object.keys(completedContent).sort(
      (a, b) => Number(a) - Number(b)
    );

    for (const classId of sortedClassIds) {
      const topics = completedContent[classId];
      const firstIncompleteIndex = topics.findIndex((t) => !t.completed);

      if (firstIncompleteIndex !== -1) {
        return {
          firstIncompleteClass: Number(classId),
          firstIncompleteTopic: firstIncompleteIndex + 1,
        };
      }
    }

    return null;
  };

  const goToHome = () => router.push("/");
  const goToCourseInfo = () => {
    const { courseId } = route.params;
    router.push(`/course/${courseId}/info`);
  }

  const updateProgress = async (progress: any) => await window.store.set("progress", progress);
  const navigateToTopic = (courseId: string, classId: number, topicId: number) => {
    router.push(`/course/${courseId}/${classId}/${topicId}`);
  };

  const getNextTopicInfo = (currentClassIndex: number, currentTopicIndex: number, isLastTopicFromClass: boolean) => {
    return {
      classId: isLastTopicFromClass ? currentClassIndex + 1 : currentClassIndex,
      topicId: isLastTopicFromClass ? 1 : currentTopicIndex + 1
    };
  };

  const goToNextTopic = async () => {
    const { courseId, classId, topicId } = route.params;
    const progress = (await window.store.get("progress")) || {};
    const courseProgress = progress[courseId] || {};
    const completedContent = courseProgress.completedContent || {};

    const currentClassIndex = parseInt(classId as string);
    const currentTopicIndex = parseInt(topicId as string);
    const isLastTopicFromClass = currentTopicIndex === topicsFromClass.value.length;
    const isLastClassFromCourse = currentClassIndex === classes.value.length;
    const isLastTopicFromCourse = isLastClassFromCourse && isLastTopicFromClass;
    const courseCompleted = isCourseCompleted(completedContent);

    // Mark current topic as completed
    if (!completedContent[classId]) {
      completedContent[classId] = [];
    }
    if (!completedContent[classId][currentTopicIndex - 1]) {
      completedContent[classId][currentTopicIndex - 1] = { completed: false };
    }
    completedContent[classId][currentTopicIndex - 1].completed = true;

    if (courseCompleted && isLastTopicFromCourse) {
      isFinishedCourse.value = true;
      courseProgress.completed = true;
      await updateProgress(progress);
      return;
    }

    if (courseCompleted) {
      const { classId: nextClassId, topicId: nextTopicId } = getNextTopicInfo(
        currentClassIndex,
        currentTopicIndex,
        isLastTopicFromClass
      );
      courseProgress.currentClass = nextClassId;
      courseProgress.currentTopic = nextTopicId;
      await updateProgress(progress);
      navigateToTopic(courseId as string, nextClassId, nextTopicId);
      return;
    }

    if (isLastTopicFromCourse) {
      const next = getFirstIncomplete(completedContent);
      if (next) {
        courseProgress.currentClass = next.firstIncompleteClass;
        courseProgress.currentTopic = next.firstIncompleteTopic;
        await updateProgress(progress);
        navigateToTopic(courseId as string, next.firstIncompleteClass, next.firstIncompleteTopic);
      }
      return;
    }

    const { classId: nextClassId, topicId: nextTopicId } = getNextTopicInfo(
      currentClassIndex,
      currentTopicIndex,
      isLastTopicFromClass
    );
    courseProgress.currentClass = nextClassId;
    courseProgress.currentTopic = nextTopicId;
    await updateProgress(progress);
    navigateToTopic(courseId as string, nextClassId, nextTopicId);
  };

  const loadCourseData = async () => {
    const { courseId, classId, topicId } = route.params;
    
    // Carrega o curso
    course.value = await window.database.getCourseById(courseId as string);
    
    // Carrega as classes
    classes.value = await window.database.getClassesByCourseId(courseId as string);
    
    // Atualiza o skeleton da sidebar
    classesSkeleton.value = await Promise.all(classes.value.map(async (classItem) => {
      const topics = await window.database.getTopicsByClassId(classItem.id);
      return {
        id: classItem.id,
        name: classItem.name,
        topics: topics.map(topic => ({
          id: topic.id,
          name: topic.name
        }))
      };
    }));

    // Carrega os tópicos da classe atual
    topicsFromClass.value = await window.database.getTopicsByClassId(classId as string);
    
    // Carrega o tópico atual
    currentTopic.value = topicsFromClass.value[parseInt(topicId as string) - 1];
    
    // Carrega o conteúdo do tópico atual
    if (currentTopic.value) {
      currentTopicContent.value = await window.database.getTopicContent(currentTopic.value.id);
    }

    // Atualiza o nome da classe atual
    const currentClass = classes.value.find(c => c.id === classId);
    if (currentClass) {
      currentClassName.value = currentClass.name;
    }

    // Atualiza o status do tópico
    await updateTopicStatus();
  };

  onMounted(() => {
    loadCourseData();
  });

  // Observa mudanças nos parâmetros da rota
  watch(
    () => route.params,
    () => {
      loadCourseData();
    }
  );
</script>
