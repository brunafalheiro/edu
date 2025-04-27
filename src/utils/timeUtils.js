class TimeUtils {
  static MINUTES_PER_TOPIC = 10;
  static MINUTES_IN_HOUR = 60;

  /**
   * Formats duration in hours and minutes into a readable string
   * @param {number} hours - Number of hours
   * @param {number} minutes - Number of minutes
   * @returns {string} Formatted duration string
   */
  static formatDuration = (hours, minutes) => {
    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  };

  /**
   * Calculates the total estimated duration of a course
   * @param {Object} course - Course object containing classes and topics
   * @returns {string} Formatted duration string
   */
  static calculateCourseDuration = (course) => {
    const totalTopics = course.classes.reduce((total, cls) => total + cls.topics.length, 0);
    const totalMinutes = totalTopics * TimeUtils.MINUTES_PER_TOPIC;
    const hours = Math.floor(totalMinutes / TimeUtils.MINUTES_IN_HOUR);
    const minutes = totalMinutes % TimeUtils.MINUTES_IN_HOUR;
    
    return TimeUtils.formatDuration(hours, minutes);
  };

  /**
   * Calculates the time already studied in a specific course based on its ID
   * @param {string} courseId - ID of the course
   * @param {Object} progress - Progress object containing completed topics
   * @returns {string} Formatted duration string
   */
  static calculateTimeStudied = (courseId, progress) => {
    if (!progress || !progress[courseId] || !progress[courseId].completedContent) {
      return TimeUtils.formatDuration(0, 0);
    }

    let completedTopics = 0;
    const courseProgress = progress[courseId].completedContent;

    Object.values(courseProgress).forEach(classContent => {
      completedTopics += classContent.filter(topic => topic.completed).length;
    });

    const totalMinutes = completedTopics * TimeUtils.MINUTES_PER_TOPIC;
    const hours = Math.floor(totalMinutes / TimeUtils.MINUTES_IN_HOUR);
    const minutes = totalMinutes % TimeUtils.MINUTES_IN_HOUR;

    return TimeUtils.formatDuration(hours, minutes);
  };

  /**
   * Calculates the remaining time to complete a course
   * @param {string} courseId - ID of the course
   * @param {Object} progress - Progress object containing completed topics
   * @returns {string} Formatted duration string
   */
  static calculateRemainingTime = (courseId, progress) => {
    const totalTopics = Object.values(progress[courseId].completedContent)
      .reduce((total, cls) => total + cls.length, 0);
    let completedTopics = 0;

    if (progress && progress[courseId] && progress[courseId].completedContent) {
      const courseProgress = progress[courseId].completedContent;
      Object.values(courseProgress).forEach(classContent => {
        completedTopics += classContent.filter(topic => topic.completed).length;
      });
    }

    const remainingTopics = totalTopics - completedTopics;
    const totalMinutes = remainingTopics * TimeUtils.MINUTES_PER_TOPIC;
    const hours = Math.floor(totalMinutes / TimeUtils.MINUTES_IN_HOUR);
    const minutes = totalMinutes % TimeUtils.MINUTES_IN_HOUR;

    return TimeUtils.formatDuration(hours, minutes);
  };
}

export { TimeUtils };
