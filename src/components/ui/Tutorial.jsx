import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useAuth } from '../../context/AuthContext';

const Tutorial = ({ steps, tutorialKey }) => {
    const { currentUser, updateUserProfile } = useAuth();
    const [run, setRun] = useState(false);

    useEffect(() => {
        // Only run if the user is loaded and hasn't seen this specific tutorial
        if (currentUser && (!currentUser.completedTutorials || !currentUser.completedTutorials[tutorialKey])) {
            // Also add a small delay to make sure UI components are mounted before joyride tries to find them
            const timer = setTimeout(() => setRun(true), 500);
            return () => clearTimeout(timer);
        }
    }, [currentUser, tutorialKey]);

    const handleJoyrideCallback = async (data) => {
        const { status } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
        
        if (finishedStatuses.includes(status)) {
            setRun(false);
            try {
                // Save to Firestore and Context so it never runs again for this tutorial
                const currentTutorials = currentUser.completedTutorials || {};
                await updateUserProfile({ 
                    completedTutorials: {
                        ...currentTutorials,
                        [tutorialKey]: true
                    }
                });
            } catch (error) {
                console.error("Failed to update tutorial status:", error);
            }
        }
    };

    return (
        <Joyride
            callback={handleJoyrideCallback}
            continuous={true}
            run={run}
            scrollToFirstStep={true}
            showProgress={true}
            showSkipButton={true}
            steps={steps}
            styles={{
                options: {
                    zIndex: 10000,
                    primaryColor: '#8b5cf6', // TaskMate primary color (violet-500 instead of green to match design scheme)
                    textColor: '#1f2937', // gray-800
                    backgroundColor: '#ffffff',
                    arrowColor: '#ffffff',
                    overlayColor: 'rgba(0, 0, 0, 0.5)',
                },
                buttonNext: {
                    backgroundColor: '#8b5cf6',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                },
                buttonBack: {
                    color: '#6b7280', // gray-500
                    marginRight: '8px',
                    fontSize: '14px',
                },
                buttonSkip: {
                    color: '#6b7280', // gray-500
                    fontSize: '14px',
                },
                tooltipContainer: {
                    textAlign: 'left',
                    borderRadius: '12px',
                    padding: '8px',
                },
                tooltipTitle: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#111827', // gray-900
                    marginBottom: '8px',
                },
                tooltipContent: {
                    fontSize: '14px',
                    color: '#4b5563', // gray-600
                }
            }}
        />
    );
};

export default Tutorial;
